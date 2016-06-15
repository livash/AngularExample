describe('momentFormatDate filter', function() {
  beforeEach(module('squidApp'));

  it('should return correct date format when given a date in the future', inject(function(momentFormatDateFilter) {
    // Arrange
    let startDate = new Date();
    let endDate = moment(startDate).add(2, 'months');

    // Act
    let filteredDate = momentFormatDateFilter(endDate);

    // Assert
    expect(filteredDate).toBe('in 2 months');
  }));

  it('should return correct date format when given a date in the past', inject(function(momentFormatDateFilter) {
    // Arrange
    let endDate = new Date();
    let startDate = moment(endDate).subtract(2, 'months');

    // Act
    let filteredDate = momentFormatDateFilter(startDate);

    // Assert
    expect(filteredDate).toBe('2 months ago');
  }));
});

describe('customFormatDate filter', function() {
  beforeEach(module('squidApp'));

  it('should return correct date format when given a date in the future', inject(function(customFormatDateFilter) {
    // Arrange
    let startDate = new Date();
    let endDate = moment(startDate).add(2, 'months');

    // Act
    let filteredDate = customFormatDateFilter(endDate);

    // Assert
    expect(filteredDate).toBe('61 days from now');
  }));

  it('should return correct date format when given a date in the past', inject(function(customFormatDateFilter) {
    // Arrange
    let endDate = new Date();
    let startDate = moment(endDate).subtract(2, 'months');

    // Act
    let filteredDate = customFormatDateFilter(startDate);

    // Assert
    expect(filteredDate).toBe('61 days ago');
  }));

  it('should return correct date when given a date one day from now', inject(function(customFormatDateFilter) {
    // Arrange
    let startDate = new Date();
    let endDate = moment(startDate).add(1, 'day');

    // Act
    let filteredDate = customFormatDateFilter(endDate);

    // Assert
    expect(filteredDate).toBe('1 day from now');
  }));

  it('should return correct date when given a date one day ago', inject(function(customFormatDateFilter) {
    // Arrange
    let endDate = new Date();
    let startDate = moment(endDate).subtract(1, 'day');

    // Act
    let filteredDate = customFormatDateFilter(startDate);

    // Assert
    expect(filteredDate).toBe('1 day ago');
  }));
});