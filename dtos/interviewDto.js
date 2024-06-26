class InterviewDto {
  constructor(interview) {
    this.id = interview._id;
    this.userId = interview.userId;
    this.schedule = interview.schedule;
    this.notes = interview.notes;
  }
}

module.exports = InterviewDto;
