class MockInterviewDto {
  constructor(mockInterview) {
    this.id = mockInterview._id;
    this.userId = mockInterview.userId;
    this.schedule = mockInterview.schedule;
    this.feedback = mockInterview.feedback;
  }
}

module.exports = MockInterviewDto;
