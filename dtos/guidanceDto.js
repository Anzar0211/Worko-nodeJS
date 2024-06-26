class GuidanceDto {
  constructor(guidance) {
    this.id = guidance._id;
    this.userId = guidance.userId;
    this.guidanceType = guidance.guidanceType;
    this.description = guidance.description;
  }
}

module.exports = GuidanceDto;
