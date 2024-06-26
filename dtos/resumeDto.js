class ResumeDto {
  constructor(resume) {
    this.id = resume._id;
    this.userId = resume.userId;
    this.content = resume.content;
  }
}

module.exports = ResumeDto;
