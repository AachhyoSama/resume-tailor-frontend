import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun
  } from "docx";
  
  export class DocumentCreator {
    // tslint:disable-next-line: typedef
    public create([contactInfo, paragraphs]): Document {
      const document = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: contactInfo.NAME,
                heading: HeadingLevel.TITLE
              }),
              this.createContactInfo(contactInfo.PHONE_NUMBER, contactInfo.PROFILE_URL, contactInfo.EMAIL, contactInfo.ADDRESS),

             
              this.createHeading(" "),
              ...paragraphs
                .map(position => {
                  const arr: Paragraph[] = [];
  
                  
                  arr.push(this.createRoleText(position.paragraphOne));
                  arr.push(this.createRoleText(position.paragraphTwo));
                  arr.push(this.createRoleText(position.paragraphThree));
                  arr.push(this.createRoleText(position.paragraphFour));
                  arr.push(this.createRoleText(position.paragraphFive));
  
                  // const bulletPoints = this.splitParagraphIntoBullets(
                  //   position.summary
                  // );
  
                 
  
                  return arr;
                })
                .reduce((prev, curr) => prev.concat(curr), []),
                
             
              
              new Paragraph("References upon request"),
              new Paragraph({
                text:
                  "This Cover Letter was generated in real-time using Resume Tailor",
                alignment: AlignmentType.CENTER
              })
            ]
          }
        ]
      });
  
      return document;
    }
  
    public createContactInfo(
      phoneNumber: string,
      profileUrl: string,
      email: string,
      address: string
    ): Paragraph {
      return new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun(
            `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
          ),
          new TextRun({
            text: address,
            break: 1
          })
        ]
      });
    }
  
    public createHeading(text: string): Paragraph {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_1,
        thematicBreak: true
      });
    }
  
    public createSubHeading(text: string): Paragraph {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_2
      });
    }
  
    public createInstitutionHeader(
      institutionName: string,
      dateText: string
    ): Paragraph {
      return new Paragraph({
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX
          }
        ],
        children: [
          new TextRun({
            text: institutionName,
            bold: true
          }),
          new TextRun({
            text: `\t${dateText}`,
            bold: true
          })
        ]
      });
    }
  
    public createRoleText(roleText: string): Paragraph {
      return new Paragraph({
        children: [
          new TextRun({
            text: roleText,
            italics: true
          })
        ]
      });
    }
  
    public createBullet(text: string): Paragraph {
      return new Paragraph({
        text: text,
        bullet: {
          level: 0
        }
      });
    }
  
    // tslint:disable-next-line:no-any
    public createSkillList(skills: any[]): Paragraph {
      return new Paragraph({
        children: [new TextRun(skills.map(skill => skill.name).join(", ") + ".")]
      });
    }
  
    // tslint:disable-next-line:no-any
    public createAchivementsList(achivements: any[]): Paragraph[] {
      return achivements.map(
        achievement =>
          new Paragraph({
            text: achievement.name,
            bullet: {
              level: 0
            }
          })
      );
    }
  
    public createInterests(interests: string): Paragraph {
      return new Paragraph({
        children: [new TextRun(interests)]
      });
    }
  
    public splitParagraphIntoBullets(text: string): string[] {
      return text.split("\n\n");
    }
  
    // tslint:disable-next-line:no-any
    public createPositionDateText(
      startDate: any,
      endDate: any,
      isCurrent: boolean
    ): string {
      const startDateText =
        this.getMonthFromInt(startDate.month) + ". " + startDate.year;
      const endDateText = isCurrent
        ? "Present"
        : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;
  
      return `${startDateText} - ${endDateText}`;
    }
  
    // tslint:disable-next-line:no-any
    public createProjectDateText(
      startDate: any,
      endDate: any,
      
    ): string {
      
  
      return `${startDate} - ${endDate}`;
    }
    public getMonthFromInt(value: number): string {
      switch (value) {
        case 1:
          return "Jan";
        case 2:
          return "Feb";
        case 3:
          return "Mar";
        case 4:
          return "Apr";
        case 5:
          return "May";
        case 6:
          return "Jun";
        case 7:
          return "Jul";
        case 8:
          return "Aug";
        case 9:
          return "Sept";
        case 10:
          return "Oct";
        case 11:
          return "Nov";
        case 12:
          return "Dec";
        default:
          return "N/A";
      }
    }
  }
  