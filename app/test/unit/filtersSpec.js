describe('momentFormatDate filter', function() {
  beforeEach(module('squidApp'));
  
  it('should return correct date format when given a date in the future', inject(function(momentFormatDateFilter) {
    // Arrange
    var startDate = new Date();
    var endDate = moment(startDate);
    endDate.add(2, 'months');
    
    // Act
    var filteredDate = momentFormatDateFilter(endDate);
    
    // Assert
    expect(filteredDate).toBe('in 2 months');
  }));
  
  it('should return correct date format when given a date in the past', inject(function(momentFormatDateFilter) {
    // Arrange
    var startDate = new Date();
    var endDate = moment(startDate);
    endDate.subtract(2, 'months');
    
    // Act
    var filteredDate = momentFormatDateFilter(endDate);
    
    // Assert
    expect(filteredDate).toBe('2 months ago');
  }));
});