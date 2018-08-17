import { browser, element, by, ElementFinder } from 'protractor';

export class UserAppOverviewPageObject {
  constructor(){

  }

  browseToPage(){

    browser.get('');
    browser.driver.sleep(500);

  }

  //UserApp Overview Page Components
  getHomepage(){
    //Wait for browser to sync angular before retrieving homepage
    browser.driver.sleep(500);
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-login/ion-content/div[2]'));
  }

  getLoginEmailInput(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-login/ion-content/div[2]/ion-item[1]/div[1]/div/ion-input/input'));
  }

  getLoginPasswordInput(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-login/ion-content/div[2]/ion-item[2]/div[1]/div/ion-input/input'));
  }

  getLoginButton(){
    return element(by.buttonText('Login'));
  }


  //Register Components
  getRegisterHereButton(){
    return element(by.buttonText('Register Here'));
  }

  getRegisterName(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-register/ion-content/div[2]/ion-list/form/ion-item[1]/div[1]/div/ion-input/input'));
  }

  getRegisterNumber(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-register/ion-content/div[2]/ion-list/form/ion-item[2]/div[1]/div/ion-input/input'));
  }

  getRegisterEmailInput(){
    browser.driver.sleep(750);
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-register/ion-content/div[2]/ion-list/form/ion-item[3]/div[1]/div/ion-input/input'));
  }

  getGenderDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-register/ion-content/div[2]/ion-list/form/ion-item[8]/div[1]/div/ion-input/input'));
    }
    
  
  getGenderOption(){
   return element(by.className('item-cover item-cover-md item-cover-default item-cover-default-md'));
    }

  getMale(){
    return element(by.buttonText('Male'));
  }

  getFemale(){
    return element(by.buttonText('Female'));
  }

  getOK(){
    return element(by.buttonText('OK'));
  }


  
  getRegisterDOB(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-register/ion-content/div[2]/ion-list/form/ion-item[5]/div[1]/div/ion-datetime/div'));
  }
  getRegisterDOBOption(){
    return element(by.className('item-cover item-cover-md item-cover-default item-cover-default-md'))
  }

  getRegisterDOBDay(){
    return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[2]'));
  }

  
  getRegisterDOBMonth(){
    return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[3]'));
  }

  getRegisterDOBYear(){
    return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[4]'));
  }

  getDone(){
    return element(by.buttonText("done"));
  }

  getRegisterAge(){
    return element(by.xpath('//*[@id="age"]/input'));
  }

  getRegisterPasswordInput(){
    browser.driver.sleep(750);
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-register/ion-content/div[2]/ion-list/form/ion-item[7]/div[1]/div/ion-input/input'));
  }

  getRegisterRepeatPasswordInput(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-register/ion-content/div[2]/ion-list/form/ion-item[8]/div[1]/div/ion-input/input'))
  }

  getRegisterButton(){
    return element(by.buttonText('Register'));
  }
  
  //Profile
  getMyProfile(){
    //Wait for browser to sync angular before retrieving Booking Detail button
    browser.driver.sleep(750);
    return element(by.cssContainingText('.input-wrapper', 'My Profile'))
  }
  getUpdateButton(){
    browser.driver.sleep(2000);
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-profile/ion-content/div[2]/div/ion-grid/ion-row/button[1]'));
  }
  getContactUpdate(){
    browser.driver.sleep(2000);
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-updateprofile/ion-content/div[2]/ion-list/form/ion-item[2]/div[1]/div/ion-input/input'));
  }
  getConfirmUpdateButton(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-updateprofile/ion-content/div[2]/button'));
  }

  
  //Menu Components
  getNavButton(){
    browser.driver.sleep(2000);
    return element(by.className('bar-buttons bar-buttons-md bar-button bar-button-md bar-button-default bar-button-default-md bar-button-menutoggle bar-button-menutoggle-md'));
  }
  //AddFamilyProfile
  getAddFamilyProfileButton(){
    //Wait for browser to sync angular before retrieving FamilyProfile button
    browser.driver.sleep(750);
    return element(by.cssContainingText('.input-wrapper', 'Add Family Profile'))
  }


  getFamilyName(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-addprofile/ion-content/div[2]/ion-list/form/ion-item[1]/div[1]/div/ion-input/input'));
  }
  getFamilyNumber(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-addprofile/ion-content/div[2]/ion-list/form/ion-item[2]/div[1]/div/ion-input/input'));
  }
  getCreateProfile(){
    return element(by.className('primary button button-md button-default button-default-md button-block button-block-md'));
  }

  getFamilyGenderDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-addprofile/ion-content/div[2]/ion-list/form/ion-item[3]'));
    }
    
  getFamilyGenderOption(){
   return element(by.className('alert-tappable alert-radio alert-radio-button alert-radio-button-md alert-radio-button-default alert-radio-button-default-md'));
    }

  getFamMale(){
    return element(by.buttonText('Male'));
  }

  getFamFemale(){
    return element(by.buttonText('Female'));
  }
  getFamDOB(){
   return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-addprofile/ion-content/div[2]/ion-list/form/ion-item[4]'));
  }
  getFamDOBoption(){
    return element(by.className('picker-wrapper'));
     }
     
  getFamOK(){
    return element(by.buttonText('OK'));
  }
  getFamDOBclassDay1(){
    return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[2]/div/button[3]'));
     }
  getFamDOBclassDay2(){
    return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[2]/div/button[5]'));
      }
  getFamDOBclassMonth1(){
     return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[3]/div/button[3]'));
      }
  getFamDOBclassMonth2(){
     return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[3]/div/button[5]'));
      }
  getFamDOBclassMonth3(){
        return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[3]/div/button[7]'));
       }
  getFamDOBclassYear1(){
      return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[4]/div/button[3]'));
      }
  getFamDOBclassYear2(){
      return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[4]/div/button[5]'));
       }
  getFamDOBclassYear3(){
     return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[4]/div/button[7]'));
        }
   getFamDOBclassYear4(){
       return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[4]/div/button[9]'));
         }
    getFamDOBclassYear5(){
       return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[4]/div/button[11]'));
          }
     getFamDOBclassYear6(){
       return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[4]/div/button[13]'));
           }
    getFamDOBclassYear7(){
       return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[4]/div/button[15]'));
                }
     getFamDOBclassYear8(){
      return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[4]/div/button[17]'));
                      }
    getFamDOBclassYear9(){
      return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[4]/div/button[19]'));
    }
      getSpecialNeed(){
        return element(by.xpath(' /html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-addprofile/ion-content/div[2]/ion-list/form/ion-item[6]/div[1]/div/ion-input/input'));                      }
    getFamDone(){
      return element(by.buttonText('Done'));
          }

    //Booking 
    getCalander(){
      return element(by.xpath(' /html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calendar/ion-content/div[2]/calendar/div/monthview/div/ion-slides/div/div[1]/ion-slide[2]/div/table/tbody/tr[5]/td[4]'));
             }
     getAddBookingbutton(){
     return element(by.xpath(' /html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calendar/ion-header/ion-navbar/ion-buttons/button'));
          }
    //Booking page
      getBookingTimeDropdown(){
      return element(by.xpath('/html/body/ion-app/ion-modal/div/page-event-modal/ion-content/div[2]/ion-list/form/ion-item[2]'));
            }
            
     getBookingTimeOption(){
        return element(by.className('picker-wrapper'));
            }
     getBookingHour(){
        return element(by.xpath('/html/body/ion-app/ion-picker-cmp/div/div[2]/div[2]/div/button[3]'));
             }
     getBookinDurationDropdown(){
        return element(by.xpath('/html/body/ion-app/ion-modal/div/page-event-modal/ion-content/div[2]/ion-list/form/ion-item[3]'));
             }
                            
      getBookingDurationOption(){
       return element(by.className('alert-wrapper'));
             }
      getDuration(){
        return element(by.buttonText('2 Hours'));
             }
      getPickUpAddress(){
      return element(by.xpath('//*[@id="autocompletePickup"]/input'));
           }
      getDestinationAddress(){
      return element(by.xpath('//*[@id="autocompleteDestination"]/input'));
            }
            getFamMemberDropDown(){
       return element(by.xpath('/html/body/ion-app/ion-modal/div/page-event-modal/ion-content/div[2]/ion-list/form/ion-item[6]'));
            }   
       getFamMemberOption(){
      return element(by.className('alert-wrapper'));
                    }
       getFamMemberName(){
       return element(by.buttonText('//*[@id="alert-input-6-0"]'));
            }

       getAssistanceDropDown(){
              return element(by.xpath('/html/body/ion-app/ion-modal/div/page-event-modal/ion-content/div[2]/ion-list/form/ion-item[7]'));
                   }   
     getAssistanceOption(){
             return element(by.className('alert-wrapper'));
                           }
      getAssistance(){
              return element(by.buttonText('None'));
                   }
       getBookingButton(){
                     return element(by.xpath('/html/body/ion-app/ion-modal/div/page-event-modal/ion-content/div[2]/button'))
                   }

  //BookingDetail
  getBookingDetail(){
    //Wait for browser to sync angular before retrieving Booking Detail button
    browser.driver.sleep(750);
    return element(by.cssContainingText('.input-wrapper', 'My Bookings'))
  }
  getListofBooking(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-booking/ion-content/div[2]/div/div/ion-list[2]/ion-row/ion-item[1]'))
  }
  getCancelBookingButton(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-bookingdetails/ion-content/div[2]/ion-list/button'))
  }

  //Booking History
  getBookingHistory(){
    //Wait for browser to sync angular before retrieving Booking Detail button
    browser.driver.sleep(750);
    return element(by.cssContainingText('.input-wrapper', 'BookingHistory'))
  }

   //FAQ
   getFAQ(){
    //Wait for browser to sync angular before retrieving Booking Detail button
    browser.driver.sleep(750);
    return element(by.cssContainingText('.input-wrapper', 'FAQ'))
  }
    //AboutUs
    getAboutUs(){
      //Wait for browser to sync angular before retrieving Booking Detail button
      browser.driver.sleep(750);
      return element(by.cssContainingText('.input-wrapper', 'About Us'))
    }
    //AboutUs
    getContactUs(){
      //Wait for browser to sync angular before retrieving Booking Detail button
      browser.driver.sleep(750);
      return element(by.cssContainingText('.input-wrapper', 'Contact Us'))
    }


   //Logout
   getLogOut(){
    //Wait for browser to sync angular before retrieving Booking Detail button
    browser.driver.sleep(750);
    return element(by.cssContainingText('.input-wrapper', 'Logout'))
   }
}