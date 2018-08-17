import { browser, element, by, ElementFinder } from 'protractor';
import { UserAppOverviewPageObject } from './page-object/userapp.overview';
import {} from 'jasmine';
let userapp = new UserAppOverviewPageObject();


export let loginUser = () =>{
  userapp.getLoginEmailInput().sendKeys('bensaga18@gmail.com');
  userapp.getLoginPasswordInput().sendKeys('ben199518');
  browser.driver.sleep(750);
  userapp.getLoginButton().click();
};

let getRandomEmail = () =>{ 
  let strValues = 'abcdefghijk123456789';
  let strEmail = '';
  for (let i = 0; i < strValues.length; i++) {
    strEmail = strEmail + strValues.charAt(Math.round(strValues.length * Math.random()));
  }
  return strEmail + '@mySelenium.test';
};

let registerUser = () =>{
  let name:string = 'Ben';
  let email:string = 'ben123@gmail.com';
  let password:string = 'password123';
  let number:number = 81234567;

  browser.driver.sleep(750);
  userapp.getRegisterHereButton().click();
  userapp.getRegisterName().sendKeys(name);
  userapp.getRegisterNumber().sendKeys(number);
  userapp.getRegisterEmailInput().sendKeys(email); //existing account
  userapp.getGenderDropdown().click();
  browser.driver.sleep(750);
  userapp.getGenderOption().click();
  browser.driver.sleep(750);
  userapp.getMale().click();
  userapp.getOK().click();
//  userapp.getRegisterDOB().click();
 // browser.driver.sleep(3000);
  //userapp.getRegisterDOBOption().click();
 // browser.driver.sleep(3000);
 

  userapp.getRegisterPasswordInput().sendKeys(password);
  userapp.getRegisterRepeatPasswordInput().sendKeys(password);
};

//describe('Registration Test Cases for UserApp', () => {

 // browser.waitForAngularEnabled(false);

 //beforeEach(() => {
 //   userapp.browseToPage();
  //  browser.waitForAngular();
  //});

 //it('it should register a New User', () => {
  //  browser.driver.sleep(2000);
  //  registerUser();
  //  userapp.getRegisterButton().click(); 
  //  browser.driver.sleep(1500);
    //Expects if homepage is displayed after successful registration
  //  expect<any>(userapp.getHomepage().isPresent()).toBe(true);
  // });
  //});

describe('Login Test Cases', () => {

  browser.waitForAngularEnabled(false);

  beforeEach(() => {
    userapp.browseToPage();
    browser.waitForAngular();
  });

  it('Login as User', () => {
    browser.driver.sleep(750);
    userapp.getLoginEmailInput().click();
    browser.driver.sleep(750);
    userapp.getLoginPasswordInput().click();

    loginUser();
    browser.driver.sleep(2000);
  });
});

it('Proceed to My Profile', () => {
  userapp.getNavButton().click();
    browser.driver.sleep(750);
    userapp.getMyProfile().click();
    browser.driver.sleep(1000);
    userapp.getUpdateButton().click();
    browser.driver.sleep(1000);
    userapp.getContactUpdate().clear();
    browser.driver.sleep(1000);
    userapp.getContactUpdate().sendKeys('88888888');
    browser.driver.sleep(1000);
    userapp.getConfirmUpdateButton().click();
    browser.driver.sleep(1000);
    userapp.getFamOK().click();
    browser.driver.sleep(1000);
  

});
    it('Go to Add new family profile', () => {
      
      browser.driver.sleep(750);
      userapp.getNavButton().click();
      browser.driver.sleep(750);
      userapp.getAddFamilyProfileButton().click();
      browser.driver.sleep(3000);
});

it('Validate Add new family profile', () => {
  userapp.getFamilyName().sendKeys('Mary');
  userapp.getFamilyNumber().sendKeys('87654321');
  browser.driver.sleep(750);
  userapp.getFamilyGenderDropdown().click();
  browser.driver.sleep(750);
  userapp.getFamilyGenderOption().click();
  browser.driver.sleep(750);
  userapp.getFamFemale().click();
  userapp.getFamOK().click();
  browser.driver.sleep(750);
  userapp.getFamDOB().click();
  browser.driver.sleep(750);
  userapp.getFamDOBoption().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassDay1().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassDay2().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassMonth1().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassMonth2().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassMonth3().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassYear1().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassYear2().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassYear3().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassYear4().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassYear5().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassYear6().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassYear7().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassYear8().click();
  browser.driver.sleep(750);
  userapp.getFamDone().click(); //check age validate
  browser.driver.sleep(2000);
  userapp.getFamDOB().click();
  browser.driver.sleep(750);
  userapp.getFamDOBoption().click();
  browser.driver.sleep(750);
  userapp.getFamDOBclassYear9().click();
  browser.driver.sleep(750);
  userapp.getFamDone().click();
  browser.driver.sleep(750);
  userapp.getSpecialNeed().sendKeys('Require Wheelchair');
  browser.driver.sleep(750);
  userapp.getCreateProfile().click();
  browser.driver.sleep(2000);

  userapp.getOK().click();
  browser.driver.sleep(1000);
});
 it('Proceed to Booking', () => {
  userapp.getCalander().click();
  browser.driver.sleep(750);
  userapp.getAddBookingbutton().click();
  browser.driver.sleep(750);
  userapp.getBookingTimeDropdown().click();
  browser.driver.sleep(1000);
  userapp.getBookingTimeOption().click();
  browser.driver.sleep(750);
  userapp.getBookingHour().click();
  browser.driver.sleep(750);
  userapp.getFamDone().click();
  browser.driver.sleep(750);
  userapp.getBookinDurationDropdown().click();
  browser.driver.sleep(750);
  userapp.getBookingDurationOption().click();
  browser.driver.sleep(750);
  userapp.getDuration().click();
  browser.driver.sleep(750);
  userapp.getOK().click();
  browser.driver.sleep(750);
  userapp.getPickUpAddress().sendKeys('Nanyang Polytechnic');
  browser.driver.sleep(750);
  userapp.getDestinationAddress().sendKeys('11 Jln Tan Tock Seng, Singapore 308433');
  browser.driver.sleep(750);

  userapp.getFamMemberDropDown().click();
  browser.driver.sleep(1000);
  userapp.getFamMemberOption().click();
  browser.driver.sleep(750);
  userapp.getFamOK().click();
  browser.driver.sleep(750);

  userapp.getAssistanceDropDown().click();
  browser.driver.sleep(1000);
  userapp.getAssistanceOption().click();
  browser.driver.sleep(750);
  userapp.getFamOK().click();
  browser.driver.sleep(1000);

  userapp.getBookingButton().click();
  browser.driver.sleep(2000);
  userapp.getFamOK().click();
  browser.driver.sleep(1000);

  });
  it('Checking and Canceling Booking Detail', () => {
    userapp.getNavButton().click();
    browser.driver.sleep(750);
    userapp.getBookingDetail().click();
    browser.driver.sleep(3000);
    userapp.getListofBooking().click();
    browser.driver.sleep(1000);
    userapp.getCancelBookingButton().click();
    browser.driver.sleep(1000);
    userapp.getFamOK().click();
    browser.driver.sleep(750);
  });

  it('Going through Booking history , About us, FAQ , Contact Us', () => {
    userapp.getNavButton().click();
    browser.driver.sleep(750);
    userapp.getFAQ().click();
    browser.driver.sleep(2000);
    userapp.getNavButton().click();
    browser.driver.sleep(750);
    userapp.getAboutUs().click();
    browser.driver.sleep(2000);
    userapp.getNavButton().click();
    browser.driver.sleep(750);
    userapp.getContactUs().click();
    browser.driver.sleep(2000);
  });

    it('Logging out', () => {
      userapp.getNavButton().click();
      browser.driver.sleep(750);
      userapp.getLogOut().click();
      browser.driver.sleep(3000);
});
