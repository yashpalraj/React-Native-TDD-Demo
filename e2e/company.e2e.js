describe('Detox Test of Company Screen', () => {
  const companyname = 'Raj';
  const employeename = 'YashpalRaj';

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('must click and open modal to enter company name and update the company list', async () => {
    await expect(element(by.id('buttonAddCompany'))).toBeVisible();
    await element(by.id('buttonAddCompany')).tap();
    await expect(element(by.id('companyTextInput'))).toBeVisible();
    await element(by.id('companyTextInput')).typeText(companyname);
    await expect(element(by.id('buttonCompanySave'))).toBeVisible();
    await element(by.id('buttonCompanySave')).tap();
    await expect(element(by.id('flatListCompanyList'))).toBeVisible();
    await element(by.label(companyname)).tap();

    await expect(element(by.id('newEmployeeButton'))).toBeVisible();
    await element(by.id('newEmployeeButton')).tap();
    await expect(element(by.id('employeeTextInput'))).toBeVisible();
    await element(by.id('employeeTextInput')).typeText(employeename);
    await expect(element(by.id('buttonEmployee'))).toBeVisible();
    await element(by.id('buttonEmployee')).tap();

    await expect(element(by.label(employeename))).toBeVisible();
    await expect(element(by.id('employeeTextInput'))).not.toBeVisible();

    // await element(by.traits(['button']).withDescendant(by.label('Back'))).tap();
    // await element(by.traits(['button']).and(by.label('Back'))).tap();
    await element(by.traits(['button']))
      .atIndex(0)
      .tap();
    await element(by.label(companyname)).tap();
    await expect(element(by.label(employeename))).toBeVisible();
  });
});
