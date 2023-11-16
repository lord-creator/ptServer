const Tutorial = require("../models/tutorial.model.js");
const nodemailer = require('nodemailer');
const request = require('request');
const url = require('url');
const Imap = require('imap');
const { json } = require("body-parser");


/* {
https://disposable.debounce.io/?email=bitamey276@anwarb.com

https://emailvalidation.abstractapi.com/v1/?api_key=27287e06a0924d959fcdf706df9ed07f&email=danybeloved@gmail.com

https://phonevalidation.abstractapi.com/v1/?api_key=1e3dd1f1d1524cdea030aa3a0b84d373&phone=+237677381456

https://timezone.abstractapi.com/v1/current_time/?api_key=24f0e3e842614adfa689e6761b641879&location=Oxford, United Kingdom
} */

//const types = ["General","Discrimination", "Abuse", "Gender-Based Violence"];


code = {
    "1" : "Successful",
    "0" : "unable to reach server",
    "-1" : "Server Down",
    "-2" : "Restricted",
    "-3" : "Unable to process request",
    "-4" : "unable to process response",
    "-5" : "Clear Data"
}

words = {
    "en": {
        emailcheckreq: "Email Validation request failed",
        notvalidemail: "Is not a valid Email",
        emailvaliderror: "Email Validation responded with invalid format",
        vCode: "Failed to send Confirmation code",
        checkUBE: "Some error occurred while verifying Employee.",
        userReg: "Failed to register user",
        recordReport: "Error Sending Report.",
        invalidsession: "Invalid user session",
        unablesession: "Unable to check session",
        mailReport: "Failed to send Report",
        emailnotavailable: "Sector details are currently not available, we will let you know as soon as possible",
        eventat: "Event in"

    },
    "fr": {
        emailcheckreq: "Validation du email a échoué",
        notvalidemail: "est un email non valid",
        emailvaliderror: "Validation email a repondu avec un format invalid",
        vCode: "Echoue d'envoyer le code de confirmation",
        checkUBE: "Une erreur s'est produite lors de la vérification de l'employé",
        userReg: "Échec de l'enregistrement de l'utilisateur",
        recordReport: "Erreur lors de l'envoi du rapport",
        invalidsession: "Session utilisateur invalide",
        unablesession: "Impossible de vérifier la session",
        mailReport: "Échec de l'envoi du rapport",
        emailnotavailable: "Les détails du secteur ne sont actuellement pas disponibles, nous vous le ferons savoir dès que possible",
        eventat: "Evenement a"
    }
}

const newer = 1.01;
const mustbe = 1.0;

/* https://ipgeolocation.abstractapi.com/v1/?api_key=72902aaae9e445be94d0bf36f21d1c4d */
/* http://ip-api.com/json/ */

function getHTML(type, user, code, lang){
    if(type=="ccode"){
        let html = [ `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
          <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="x-apple-disable-message-reformatting">
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <!--<![endif]-->
          <title></title>
        
          <style type="text/css">
            @media only screen and (min-width: 620px) {
              .u-row {
                width: 600px !important;
              }
              .u-row .u-col {
                vertical-align: top;
              }
              .u-row .u-col-100 {
                width: 600px !important;
              }
            }
            
            @media (max-width: 620px) {
              .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
              }
              .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
              }
              .u-row {
                width: 100% !important;
              }
              .u-col {
                width: 100% !important;
              }
              .u-col>div {
                margin: 0 auto;
              }
            }
            
            body {
              margin: 0;
              padding: 0;
            }
            
            table,
            tr,
            td {
              vertical-align: top;
              border-collapse: collapse;
            }
            
            p {
              margin: 0;
            }
            
            .ie-container table,
            .mso-container table {
              table-layout: fixed;
            }
            
            * {
              line-height: inherit;
            }
            
            a[x-apple-data-detectors='true'] {
              color: inherit !important;
              text-decoration: none !important;
            }
            
            table,
            td {
              color: #000000;
            }
            
            #u_body a {
              color: #0000ee;
              text-decoration: underline;
            }
          </style>
        
        
        
          <!--[if !mso]><!-->
          <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
          <!--<![endif]-->
        
        </head>
        
        <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
          <!--[if IE]><div class="ie-container"><![endif]-->
          <!--[if mso]><div class="mso-container"><![endif]-->
          <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
            <tbody>
              <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
        
        
        
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                          <div style="height: 100%;width: 100% !important;">
                            <!--[if (!mso)&(!IE)]><!-->
                            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                              <!--<![endif]-->
        
                              <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
        
                                      <div style="font-size: 14px; color: #afb0c7; line-height: 170%; text-align: center; word-wrap: break-word;">
                                        <p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">View Email in Browser</span></p>
                                      </div>
        
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
        
                              <!--[if (!mso)&(!IE)]><!-->
                            </div>
                            <!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
        
        
        
        
        
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                          <div style="height: 100%;width: 100% !important;">
                            <!--[if (!mso)&(!IE)]><!-->
                            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                              <!--<![endif]-->
        
                              <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Cabin',sans-serif;" align="left">
        
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                          <td style="padding-right: 0px;padding-left: 0px;" align="center">
        
                                            <img align="center" border="0" src="https://commehome.ca/wp-content/uploads/2022/02/CommeHome-logo-3-e1661797480722-220x71.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 32%;max-width: 179.2px;"
                                              width="179.2" />
        
                                          </td>
                                        </tr>
                                      </table>
        
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
        
                              <!--[if (!mso)&(!IE)]><!-->
                            </div>
                            <!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
        
        
        
        
        
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
                      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                          <div style="height: 100%;width: 100% !important;">
                            <!--[if (!mso)&(!IE)]><!-->
                            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                              <!--<![endif]-->
        
                              <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">
        
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                          <td style="padding-right: 0px;padding-left: 0px;" align="center">
        
                                            <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 26%;max-width: 150.8px;"
                                              width="150.8" />
        
                                          </td>
                                        </tr>
                                      </table>
        
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
        
                              <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
        
                                      <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                        <p style="font-size: 14px; line-height: 140%;"><strong>T H A N K S&nbsp; &nbsp;F O R&nbsp; &nbsp;S I G N I N G&nbsp; &nbsp;U P !</strong></p>
                                      </div>
        
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
        
                              <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">
        
                                      <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                        <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Verify Your E-mail Address </span></strong>
                                          </span>
                                        </p>
                                      </div>
        
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
        
                              <!--[if (!mso)&(!IE)]><!-->
                            </div>
                            <!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
        
        
        
        
        
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                          <div style="height: 100%;width: 100% !important;">
                            <!--[if (!mso)&(!IE)]><!-->
                            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                              <!--<![endif]-->
        
                              <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
        
                                      <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                        <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi, ${user._name}</span></p>
                                        <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Below is the verification code to confirm your email address. If you didn't create an account with Cryout, you can safely delete this email.</span></p>
                                      </div>
        
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
        
                              <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
        
                                      <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                      <div align="center">
                                        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46px; v-text-anchor:middle; width:234px;" arcsize="8.5%"  stroke="f" fillcolor="#ff6600"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                        <a href="" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ff6600; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                          <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">${code}</span></strong>
                                          </span>
                                          </span>
                                        </a>
                                        <!--[if mso]></center></v:roundrect><![endif]-->
                                      </div>
        
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
        
                              <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
        
                                      <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                        <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Thanks,</span></p>
                                        <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">The CryOut Team</span></p>
                                      </div>
        
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
        
                              <!--[if (!mso)&(!IE)]><!-->
                            </div>
                            <!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
        
        
        
        
        
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e5eaf5;">
                      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e5eaf5;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                          <div style="height: 100%;width: 100% !important;">
                            <!--[if (!mso)&(!IE)]><!-->
                            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                              <!--<![endif]-->
        
                              <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:'Cabin',sans-serif;" align="left">
        
                                      <div style="font-size: 14px; color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;">
                                        <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px;"><strong>Get in touch</strong></span></p>
                                        <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;"></span></p>
                                        <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">whvp@commehome.ca</span></p>
                                      </div>
        
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
        
                              <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif;" align="left">
        
                                      <div align="center">
                                        <div style="display: table; max-width:244px;">
                                          <!--[if (mso)|(IE)]><table width="244" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:244px;"><tr><![endif]-->
        
        
                                          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                            <tbody>
                                              <tr style="vertical-align: top">
                                                <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                  <a href="https://facebook.com/" title="Facebook" target="_blank">
                                                    <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                  </a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <!--[if (mso)|(IE)]></td><![endif]-->
        
                                          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                            <tbody>
                                              <tr style="vertical-align: top">
                                                <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                  <a href="https://linkedin.com/" title="LinkedIn" target="_blank">
                                                    <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                  </a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <!--[if (mso)|(IE)]></td><![endif]-->
        
                                          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                            <tbody>
                                              <tr style="vertical-align: top">
                                                <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                  <a href="https://instagram.com/" title="Instagram" target="_blank">
                                                    <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                  </a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <!--[if (mso)|(IE)]></td><![endif]-->
        
                                          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                            <tbody>
                                              <tr style="vertical-align: top">
                                                <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                  <a href="https://youtube.com/" title="YouTube" target="_blank">
                                                    <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png" alt="YouTube" title="YouTube" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                  </a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <!--[if (mso)|(IE)]></td><![endif]-->
        
                                          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                            <tbody>
                                              <tr style="vertical-align: top">
                                                <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                  <a href="https://email.com/" title="Email" target="_blank">
                                                    <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/email.png" alt="Email" title="Email" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                  </a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <!--[if (mso)|(IE)]></td><![endif]-->
        
        
                                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                        </div>
                                      </div>
        
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
        
                              <!--[if (!mso)&(!IE)]><!-->
                            </div>
                            <!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
        
        
        
        
        
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
                      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                          <div style="height: 100%;width: 100% !important;">
                            <!--[if (!mso)&(!IE)]><!-->
                            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                              <!--<![endif]-->
        
                              <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
        
                                      <div style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                        <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights © Company All Rights Reserved</span></p>
                                      </div>
        
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
        
                              <!--[if (!mso)&(!IE)]><!-->
                            </div>
                            <!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
        
        
        
                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <!--[if mso]></div><![endif]-->
          <!--[if IE]></div><![endif]-->
        </body>
        
        </html>`,
        ]
        return html[0] || html[0]
    }else if(type=="report"){
        let html =
            `<html class="metro-no-touch-device">
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
            <div style="position: relative;
        background: linear-gradient(45deg, rgb(19, 73, 95), rgb(118, 75, 226), rgb(131, 115, 198), rgb(119, 211, 185));
        background-attachment: fixed;
        height:auto;
        padding: 3rem 0;
        margin: 0;
        color: #555;
        font-family: 'Lato', sans-serif;
        font-size: 14px;">
            <div class="mobile-wrapper" style="background: #fff;
            z-index: 1;
            position: relative;
            width: 380px;
            min-height: 100%;
            margin: auto;
            padding: 10px 0 20px;
            border-radius: 10px;
            box-shadow: 0px 10px 30px -10px #000;
            overflow: hidden;">
                <header style="margin-bottom: 40px;">
                   <div style="position:relative; width: 90%;
                   margin: auto;">
                      <span style="color: #444;
                      font-family: 'Ramabhadra';
                      font-size: 21px;
                      font-weight: 700;">Hi Boss</span>
                      <h1 style="margin-top: 5px;
                      color: #919294;
                      font-size: 13px;
                      font-weight: 300;">CryOut</h1>
                   </div>
                </header>
                <section id="today-box" style="background: linear-gradient(to left, #485fed, rgba(255, 44, 118, .25)), #485fed;
                color: #FFF;
                padding: 37px 40px;
                position: relative;
                box-shadow: 0px 0px 40px -9px #485fed;
                margin-bottom: 50px;">
                   <span class="breadcrumb" style="font-weight: 500;
                   position: relative;">${lang.eventin}: ${user.location}</span>
                   <h3 class="date-title" style="font-size: 20px;
                   margin: 7px 0 0 0;
                   letter-spacing: 1px;
                   font-weight: 600;
                   text-shadow: 0px 0px 5px  rgba(#000, 0.15);">${user.date}, ${user.time} | ${user.timeZone}</h3>
             
                   <div class="plus-icon" style="border: 2px solid rgba(#FFF, 0.6);
                   border-radius: 50%;
                   box-shadow: 0px 10px 30px -14px #000;
                   position: absolute;
                   top: 50%;
                   transform: translateY(-50%);
                   right: 40px;
                   cursor: pointer;
                   transition: all 350ms ease;
                   transition-timing-function: cubic-bezier(0.05,1.8,1,1.57);">
                      <i style="font-size: 22px;
                      font-weight: 700;
                      background: #fff;
                      color: #777;
                      width: 45px;
                      height: 45px;
                      border: 6px solid #485fed;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;" class="ion ion-ios-add"></i>
                   </div>
                </section>
                <section class="upcoming-events">
                   <div class="container" style="width: 90%;
                   margin: auto;">
                      <h3 stye="color: #333;
                      font-size: 17px;
                      margin-bottom: 30px;
                      position: relative;">
                         CryOut Report
                      </h3>
                      <div class="events-wrapper" style="margin-bottom: 30px;">
                         <div class="event" style="position: relative;
                         margin-bottom: 25px;
                         padding-left:30px;
                         cursor: pointer;">
                            <i class="ion ion-ios-flame hot" style="font-size: 24px;
                            font-weight: 100;
                            position: absolute;
                            left: 0;
                            top: -4px;"></i>
                            <h4 class="event__point" style="margin: 0;
                            color: #555;
                            font-size: 15px;
                            font-weight: 800;
                            letter-spacing: 1px;">${user.name} ${user.victim}</h4>
                            <span class="event__duration"></span>
                            <p class="event__description" style="margin-top: 10px;
                            color: #919294;
                            font-size: 13px;
                            font-weight: 300;
                            word-break: break-word;">
                               ${user.text}
                            </p>
                         </div>
                    </div>`
                
                    html += (code && code.length)? ` <button style="display: flex;
                align-items: center;
                margin-left: auto;
                border: 0;
                padding: 0;
                background: linear-gradient(to left, #485fed, rgba(255, 44, 118, .25)), #485fed;
                border-radius: 50px;
                cursor: pointer;
                box-shadow: 0px 0px 40px -9px #485fed;">
                <a href="http://localhost:8080/api/cryout/listen?r=${code}"><span class="add-event-button__title" style="color: #FFF;
                padding: 0 18px 0 23px;
                text-shadow: 0px 0px 5px  rgba(#000, 0.2);
                font-family: 'Lato';
                font-size: 15px;
                font-weight: 600;">Listen to Audio</span>

                <span style="display: inline-block;
                background: rgba(#FFF, 0.1);
                padding: 0 17px 0 12px;
                height: 100%;">
                    <i style="margin: 0;
                    color: #fff;
                    font-size: 25px;
                    padding: 13px 0;" class="ion ion-ios-star-outline"></i>
                </span>
                </a>


                </button>`:'';
            html+=`</div>
        </section>
        </div>
        </div>
        </body>
        </html`;
        console.log("AUDIO LINK:    ", (code && code.length)?true:false)
        return html;
    }else{
        let html = `
        <html class="metro-no-touch-device"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cryoutfontawesomepro.000webhostapp.com/fontawesome/css/all.css">
        <link rel="stylesheet" href="https://cdn.korzh.com/metroui/v4.5.1/css/metro-all.min.css">
        <style>
            body {
              padding: 0;
              margin: 0;
              background: #e0e5ec;
              font-family: "Roboto", sans-serif;
            }
            .container {
              width: 100vw;
              max-height: 100vh;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .iphone {
              width: 312px;
              height: 100%;
              background: #e0e5ec;
              border-radius: 2em;
              box-sizing: border-box;
              padding: 2em;
              display: flex;
              flex-direction: column;
            }
            .iphone .title {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              font-size: 0.75em;
              margin-bottom: 2em;
            }
            .iphone .album-cover {
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
            }
            .iphone .album-cover .album-overlay {
              background: #fff;
              width: 248px;
              height: 248px;
              z-index: 2;
              border-radius: 15px;
              position: absolute;
              opacity: 0.35;
              -webkit-clip-path: ellipse(61% 64% at 82% 56%);
              clip-path: ellipse(61% 64% at 82% 56%);
            }
            .iphone .album-cover img {
              width: 100%;
              border-radius: 15px;
            }
            .iphone .album-cover .cryout {
              text-align: center;
              padding-bottom: 0;
              margin-bottom: 0;
              color: #65717e;
            }
            .iphone .album-cover .sender-name {
              text-align: center;
              padding: 1em 0;
              margin: 0;
              font-size: 0.85em;
              color: #65717e;
            }
            .iphone .track {
              margin-top: 1em;
              height: 10px;
            }
            .iphone .track div {
              width: 42%;
              height: 100%;
              background: #7e8a98;
              opacity: 0.75;
              border-radius: 15px;
            }
            .iphone .buttons {
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              padding: 1em 0;
            }
            .iphone .lyrics {
              color: #7e8a98;
              margin-top: 2em;
              text-align: center;
              font-size: 0.75em;
              display: flex;
              flex-direction: column;
            }
            .neu {
              box-shadow: -5px -5px 15px 0px #ffffff9e, 5px 5px 15px 0px #a3b1c6a8;
              background: #e0e5ec;
              border-radius: 2em;
              border: 0;
            }
            .btn {
              padding: 15px;
              border-radius: 30px;
              color: #7e8a98;
              outline: none;
              cursor: pointer;
            }
            .btn.lg {
              font-size: 1em;
            }
            .btn:active {
              cursor: pointer;
              box-shadow: inset -5px -5px 15px 0px #ffffff9e, inset 5px 5px 15px 0px #a3b1c6a8;
            }
            .red {
              color: #e22d49;
            }
            .div-sm{
              width: 50px;
              height: 50px;
            }
            .div-lg{
              width: 248px;
              height: 248px;
            }

        </style>
    <style></style>
    </head>
    <body>
        <div class="container">
          <div class="iphone neu">
            <div class="title">
<!--               <div><i class="fas fa-chevron-left"></i></div> -->
              <div><img class="div-sm" src="https://static.vecteezy.com/system/resources/previews/006/294/622/large_2x/initial-letter-c-slice-style-logo-template-design-vector.jpg" alt=""></div>
<!--               <div><i class="fas fa-ellipsis-v"></i></div> -->
            </div>
            <div class="album-cover">
              <div class="album-overlay"></div>
              <div class="div-lg"></div>
              <h2 class="cryout">
                Cryout
              </h2>
              <h3 class="sender-name">
                ${code}
              </h3>
            </div>
            <div class="buttons">
<!--                   <button class="btn lg red neu"><i class="fas fa-heart"></i></button> -->
                  <button id="backward" class="btn lg neu"><i class="fas fa-backward"></i></button>
                  <button id="play" class="btn lg neu"><i id="play-icon" class="fas fa-play"></i></button>
                  <button id="forward" class="btn lg neu"><i class="fas fa-forward"></i></button>
              </div>
              <div class="media-player audio-player light">
              <audio id="audio" class="light" data-role="audio-player"
                data-src="./download/${code}"
                data-show-loop="false"
                data-show-stop="false"
                data-show-volume="false"
                data-show-play="false"
                data-show-info="false"
                data-loop-icon="<span class='mif-loop2 fg-orange'></span>"
                data-mute-icon="<i class='fas fa-volume-mute'></i>"
                data-volume-icon="<i class='fas fa-volume'></i>"
                data-volume-low-icon="<i class='fas fa-volume-low'></i>"
                data-volume-medium-icon="<i class='fas fa-volume'></i>"
                data-volume-high-icon="<i class='fas fa-volume-high'></i>"
                data-play-icon="<i class='fas fa-play'></i>"
                data-stop-icon="<i class='fas fa-stop'></i>">
              </audio>
              </div>
            
<!--             <div class="track neu">
              <div></div>
                
            </div> -->
            <div class="lyrics">
              <i class="fas fa-angle-up"></i>
              <!--<span>LYRICS</span>-->
            </div>
          </div>
        </div>
        <script src="https://cdn.korzh.com/metroui/v4.5.1/js/metro.min.js"></script>
        <script>
            var playable = true;
            const aud = document.getElementById('audio');
            aud.addEventListener("error", Errorplay)
            aud.addEventListener('play',playing);
            aud.addEventListener('pause',paused);
            const playIconContainer = document.getElementById('play-icon');
            const playContainer = document.getElementById('play');
            const forwardContainer = document.getElementById('forward');
            const backwardContainer = document.getElementById('backward');
            var player = Metro.getPlugin(aud, 'audio-player');
            let state = 'play';

            function Errorplay(){
                console.log(aud.src)
                paused();
                playable = false
                alert("Audio not Found");
            }

            playContainer.addEventListener('click',()=>{ 
                if(playable){
                    if(state === 'play') {
                        aud.play();
                    } else {
                        aud.pause();
                    }
                }
            });
          forwardContainer.addEventListener('click', Forward);
          backwardContainer.addEventListener('click', Backward);
          function playing(){
            playIconContainer.className = "fas fa-pause"
            state = 'pause';
          }
          function paused(){
            playIconContainer.className = "fas fa-play"
            state = 'play';
          }
          function Forward() {
            aud.currentTime += 10;
          }
          function Backward() {
            aud.currentTime -= 10;
          }
        </script>
    
</body></html>
        `
        return html
    }
}

function saveSent(FROM, TO, HTML, SUBJECT){
    // Append the sent email to the "Sent" folder using IMAP
    const imap = new Imap({
        user: "whvp@commehome.ca",
        password: "Bueamarket@10",
        host: "imap.titan.email",
        port: 993,
        tls: true,
    });
    
    imap.once('ready', () => {
        imap.openBox('Sent', true, (err) => {
            if (err) {
                console.error('Error opening "Sent" folder:', err);
                imap.end();
                return;
            }
            
            // Create the email message as MIMEText
            const emailMessage = `From: ${FROM}\r\nTo: ${TO}\r\nSubject: ${SUBJECT}\r\n\r\n${HTML}`;
            
            // Append the sent email to the "Sent" folder
            imap.append(emailMessage, { mailbox: 'Sent' }, (appendErr) => {
                if (appendErr) {
                    console.error('Error appending email to "Sent" folder:', appendErr);
                } else {
                    console.log('Email appended to "Sent" folder.');
                }
                imap.end();
            });
        });
    });
    
    /* imap.once('error', (imapErr) => {
    console.error('IMAP Error:', imapErr);
    }); */
    
    imap.connect();
}

function sendMail(FROM, TO, HTML, SUBJECT){
    return new Promise((resolve,reject)=>{
        var transporter = nodemailer.createTransport({
            host: "smtp.titan.email",
            port: 587,
            auth: {
              user: 'whvp@commehome.ca',
              pass: 'Bueamarket@10'
            }
        });
        var mailOptions = {
            from: "whvp@commehome.ca",
            to: TO,
            subject: SUBJECT,
            html: HTML
            // text: 'That was easy!'
        };
       let resp=false;
       
       transporter.sendMail(mailOptions, function(error, info){
           if (error) {
               console.log("error is ", error);
              resolve(false, error); // or use rejcet(false) but then you will have to handle errors
            } 
            else {
              console.log('Email sent: ' + info.response);
              saveSent(FROM, TO, HTML, SUBJECT);
              resolve(true, info.response);
            }
        });
    })
}

function checkemail(email, success, serverres, lang){
    const options = {
        url: `https://mailcheck.p.rapidapi.com/?domain=${email}`,
        headers: {
            'User-Agent': 'request',
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'X-Rapidapi-Host': "mailcheck.p.rapidapi.com",
            'X-Rapidapi-Key': '079cffc931msh37c3e34ca726003p1b1ab4jsnf49c3b9c47c1'
        }
    };
    let c = request.get(options, (err, res, body)=>{
        if(err){
            console.log("Error Validating email: "+ email)
            serverres.status(400).send({
                message: lang.emailcheckreq,
                _ccode: -3,
                _object: "emailV"
            });;
        }else{
            try {
                var o = JSON.parse(body);
                if (o && typeof o === "object") {
                    console.log("Email (OBJECT):", o)
                    if(o.disposable || !o.valid || o.risk > 60)
                        serverres.status(400).send({
                            message: lang.notvalidemail,
                            _ccode: -3,
                            _object: "emailV"
                        });
                    else success()
                    
                }else{
                    console.log(`Email (${(typeof o).toUpperCase()}):`, o)
                    serverres.status(400).send({
                        message: lang.emailvaliderror,
                        _ccode: -4,
                        _object: "emailV"
                    });
                }
            }
            catch (e) {
                console.log("INVALID DATA:", body, "\n", "\n")
                serverres.status(400).send({
                    message: lang.emailvaliderror,
                    _ccode: -3,
                    _object: "emailV"
                });
                // console.log("ERROR:", e)
            }
        }
    })
}

function getRequest(url){
    return new Promise((resolve,reject)=>{
        let c = request.get(url, (err, res, body)=>{
            if(err){
                reject(err);
            }else{
                try {
                    var o = JSON.parse(body);
                    if (o && typeof o === "object") {
                        resolve(o);
                    }else{
                        reject(o)
                    }
                }
                catch (e) {
                    reject(e)
                    // console.log("ERROR:", e)
                }
            }
        })
    })
}

function checkemail2(email, success, serverres, lang){
    const options = {
        url: `https://mailcheck.p.rapidapi.com/?domain=${email}`,
        headers: {
            'User-Agent': 'request',
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'X-Rapidapi-Host': "mailcheck.p.rapidapi.com",
            'X-Rapidapi-Key': 'cd714a85d3msh85b3675ad22bd28p104e35jsnd680e51f4488'
        }

    };
    let c = request.get(options, (err, res, body)=>{
        if(err){
            console.log("Error Validating email: "+ email)
            serverres.status(400).send({
                message: lang.emailcheckreq,
                _ccode: -3,
                _object: "emailV"
            });;
        }else{
            try {
                var o = JSON.parse(body);
                if (o && typeof o === "object") {
                    console.log("Email (OBJECT):", o)
                    if(o.disposable || !o.valid || o.risk > 60)
                        serverres.status(400).send({
                            message: lang.notvalidemail,
                            _ccode: -3,
                            _object: "emailV"
                        });
                    else success()
                    
                }else{
                    console.log(`Email (${(typeof o).toUpperCase()}):`, o)
                    serverres.status(400).send({
                        message: lang.emailvaliderror,
                        _ccode: -4,
                        _object: "emailV"
                    });
                }
            }
            catch (e) {
                console.log("INVALID DATA:", body, "\n", "\n")
                serverres.status(400).send({
                    message: lang.emailvaliderror,
                    _ccode: -3,
                    _object: "emailV"
                });
                // console.log("ERROR:", e)
            }
        }
    })
}

const preg_match = function(pattern, value){
	return pattern.test(value);
}

exports.verifyEmail = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Email's Content can not be empty!"
        });
    }
    console.log("verifyEmail: ", req.body);
    const vcode = req.body.code;
    const user = req.body.user;
    const lang = words[req.body.lang] || words.en;

    // Create a Tutorial
    const employee = {
        id: (user.id)?user.id:null,
        _name: user._name,
        _email: user._email,
        _industry: user._industry.id
    };

    checkemail(
        employee._email,
        ()=>{
            sendMail("CryOut", employee._email, getHTML("ccode", employee, vcode),"Cryout Code").then(
                (value, info)=>{
                    if(value)
                        res.send({_employer: user._employer});
                    else res.status(500).send({
                        message: lang.vCode || info,
                        _ccode: -4,
                        _object: "emailS"
                    })
                }
            )
        },
        res,
        lang
    )
}

exports.getEmployer = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Email's Content can not be empty!"
        });
    }
    console.log("BODY: ", req.body);
    const detail = {
        id: (req.body.id)?req.body.id: undefined,
        industry: (req.body.industry)?req.body.industry: undefined
    }
    const lang = words[req.body.lang] || words.en;

    Tutorial.getEmployer(detail, (err, data)=>{
        if (err)
            res.status(500).send({
                message: lang.checkUBE||err.message
            });
        else{
            _existingStatus = data;
            if (_existingStatus==0) {
                res.status(300).send({
                    message:
                        lang.emailnotavailable,
                    _ccode: -4,
                    _object: "recordReport"
                }); 
            }else{
                console.log("Fetched Boss: ",data);
                res.send(data);
            }
        }
    })

}

exports.online = (req, res)=>{
  res.send(JSON.stringify(1));
}

// Create and Save a new Tutorial
exports.registerUser = (req, res) => {
    // Validate request
    var _existingStatus = 0;
    if (!req.body) {
        res.status(400).send({
        message: "Employee's Content can not be empty!"
        });
    }
    console.log("BODY", req.body);
    const user = req.body.user;
    const lang = words[req.body.lang] || words.en;

    // Create a Tutorial
    const employee = {
        id: (user.id)?user.id:null,
        _name: user._name,
        _email: user._email,
        _industry: user._industry.id
    };
    
    // Check if User's Record already exists
    Tutorial.checkUbyemail(employee._email, (err, data1) => {
        if (err)
        res.status(500).send({
            message: lang.checkUBE||err.message
        });
        else{
            _existingStatus = data1;
            if (_existingStatus==0) {
                // Save Tutorial in the database
                Tutorial.registerUser(employee, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                lang.userReg,
                            _ccode: -4,
                            _object: "registeruser"
                        });
                    else{
                        console.log("Registered Employee: ",data);
                        res.send(data);
                    }
                });
            }else{
                console.log("_existingStatus: ", _existingStatus);
                Tutorial.updateUbyemail(employee, (err, data)=>{
                    if (err)
                    res.status(500).send({
                        message:
                            lang.userReg||err.message,
                        _ccode: -4,
                        _object: "updateuser"
                    });
                    else{
                        data.id = _existingStatus.id;
                        console.log("Updated Employee: ", data);
                        res.send(data);
                    }
                })
            }
        }
    });

};

//Record Report 
exports.recordReport = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Report's Content can not be empty!"
        });
    }
    // console.log("FILES:", req.file);
    console.log("BODY:", req.body);
    // console.log("BODY:", typeof req.body.audio);

    console.log(req.body)
    // let received = JSON.parse(req.body.data);
    const report = {
        id: null,
        _employee: req.body.report._employee,
        _anonymous: req.body.report._anonymous,
        _victim: req.body.report._victim,
        _to: req.body.report._to,
        _text: req.body.report._text,
        _eventdate: req.body.report._eventdate,
        _eventtime: req.body.report._eventtime,
        _offset: req.body.report._offset,
        _location: req.body.report._location,
        info: req.body.report.info
    }
    // req.body.report;
    // report.audio = req.file?.filename
    const user = req.body.user;
    const _ip = req.body.ip;
    const clean = {
        name: (report._anonymous)?"Anonymous":user._name,
        victim: (report._victim)?" || (Victim)":"",
        type: report._type,
        text: report._text,
        date: report._eventdate,
        time: report._eventtime,
        location: report._location,
        timeZone: "GMT+"+((0 - report._offset)/60)
    }
    const lang = words[req.body.lang] || words.en;
    if(!preg_match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9]+(\.[a-z]{2,4})$/, report._to))
        res.status(400).send({
            message: lang.notvalidemail,
            _ccode: -3,
            _object: "recordReport"
        });

    

    Tutorial.checkSession(user, (err, valid) => {
        if (err)
        res.status(500).send({
            message: lang.unablesession||err.message,
            _ccode: -4,
            _object: "checkSession"
        });
        else{
            console.log("Checking Session: ", valid);
            if(valid){
                getRequest(`http://ip-api.com/json/${_ip}`).then(
                    (data)=>{
			console.log("data:", data);
                        report.info = JSON.stringify(data);
                        /* getRequest("http://localhost/api/timeapi.php").then(
                            (data2)=>{
                                report.date = data2.date
                                clean.date = data2.date */
                                const nDate = new Date();
                                clean.date = nDate.toLocaleString('en-CA', {
                                    timeZone: 'Africa/Douala'
                                });
                                report.date = nDate
                                Tutorial.recordReport(report, (err, data3) => {
                                    if (err)
                                    res.status(500).send({
                                        message: lang.recordReport||err.message,
                                        _ccode: -4,
                                        _object: "recordReport"
                                    });
                                    else{
                                        console.log("Recorded Report: ", data3);
                                        console.log("Report: ", report);
                                        sendMail("CryOut", report._to, getHTML("report", clean, lang), "Cryout Report").then(
                                            (value, info)=>{
						                        console.log(value);
                                                if(value){            
                                                    res.send(data3);
                                                }else res.status(500).send({
                                                    message: lang.mailReport || info,
                                                    _ccode: -4,
                                                    _object: "reportS"
                                                })
                                            }
                                        )
                                    }
                                });
                            /* },
                            (error)=>{
                                res.status(500).send({
                                    message: lang.recordReport||error.message,
                                    _ccode: -4,
                                    _object: "timeapi"
                                });
                            }
                        ) */
            
                    },
                    (error)=>{
                        res.status(500).send({
                            message: lang.recordReport||error.message,
                            _ccode: -4,
                            _object: "recordReport"
                        });
                    }
                )
                
            }else{
                res.status(500).send({
                    message: lang.invalidsession||err.message,
                    _ccode: -5,
                    _object: "checkSession"
                });
            }
        }
    });


}

exports.listening = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Employer's Content can not be empty!"
        });
    }
    console.log(req.url)
    rq = url.parse(req.url, true).query;
    const clean = {
        /* name: (data._anonymous)?"Anonymous":"view in email",
        victim: data._victim,
        type: data._type,
        text: data._text */
    }
    const lang = words[rq.lang] || words.en;
    res.write( getHTML("listen", clean, rq.r));
    res.end();
    /* Tutorial.findReportById(rq.r, (err, data)=>{
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while registering the Employee."
            });
        else{
            if(data){
            }else{
                res.end("lacking")
            }
        }
    }) */
}

// Create and Save a new Temporal Employer
exports.recordTemployer = (req, res) => {
    var _existingStatus = 0;
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Employer's Content can not be empty!"
        });
    }
    // console.log(req.body);

    // Create a Employer
    const employer = req.body;

    Tutorial.checkTEbyss(employer._ss, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while registering the Employee."
        });
        else{
            _existingStatus = data;
            if (_existingStatus==0) {
                // Save Tutorial in the database
                Tutorial.recordTemployer(employer, (err, data) => {
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while creating the Temporary Employer."
                    });
                    else{
                        console.log("Recorded Employer: ", data);
                        res.send(data);
                    }
                });
            }else{
                Tutorial.updateTEbyss(employer,(err, data)=>{
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while Updating the Temporary Employer."
                    });
                    else{
                        data.id = _existingStatus.id;
                        console.log("Updated Employer: ", data);
                        res.send(data);
                    }
                })
            }
        }
    })
};

exports.getUpdates = (req, res) =>{

    const updates = []

    Tutorial.getTopupdate((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving updates."
          });
        else{
            if(data){
                updates.push(data);
                Tutorial.getupdates((err, data) => {
                    if (err)
                      res.status(500).send({
                        message:
                          err.message || "Some error occurred while retrieving updates."
                      });
                    else{
                        if(data){
                            data.forEach(e => {
                                updates.push(e);
                            });
                        }
                        res.send(updates);
                    }
                });
            }
        }
    });
}


// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    Tutorial.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
};


// Retrieve all Industries from the database (with no condition).
exports.start = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "",
            _ccode: -3
        });
    }
    // const title = req.query.title;
    var obj = {
        industries: undefined,
        employers: undefined,
        updates: undefined
    }

    Tutorial.getIndustries((err, data) => {
      if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving industries.",
            _ccode: -4
        });
      else{
        if(!data){
            data = [];
        }
        obj.industries = data;
        Tutorial.getEmployers((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving employers.",
                    _ccode: -4
                });
            else{
                if(!data){
                    data = [];
                }
                obj.employers = data;
                // res.send(obj);
                Tutorial.getupdates((err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while retrieving updates.",
                            _ccode: -4
                        });
                    else{
                        if(!data){
                            data = [];
                        }
                        obj.updates = data;
                        res.send(obj);
                    }
                });
            }
        });
      }
    });
};


// Retrieve all doctors from the database (with no condition).
exports.getdoctors = (req, res) => {
    // const title = req.query.title;

    Tutorial.getdoctors((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving doctors."
        });
      else res.send(data);
    });
};

// Retrieve all Employers from the database (with no condition).
exports.getEmployers = (req, res) => {
    // const title = req.query.title;
  
    Tutorial.getEmployers((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Employers."
        });
      else res.send(data);
    });
  };


// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    Tutorial.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Tutorial with id " + req.params.id
            });
          }
        }else
            res.send(data);
    });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        else res.send(data);
    });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Tutorial.updateById(
        req.params.id,
        new Tutorial(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Tutorial with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Tutorial with id " + req.params.id
            });
            }
        } else res.send(data);
        }
    );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tutorial with id " + req.params.id
                });
            }
        } else res.send({ message: `Tutorial was deleted successfully!` });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all tutorials."
            });
        else res.send({ message: `All Tutorials were deleted successfully!` });
    });
};

exports.do = (req, res) => {
    sendMail("ace", "danybeloved@gmail.com", getHTML('ccode', {_name: "TEST"}, "vebhveuyer"), "TEST").then(
        (valid,info)=>{
            res.write("Success: "+valid.toString())
            res.write("<br> Details: "+info)
            res.end("<br>Done")
        }
    )
}

exports.download = (req, res) => {
    var q = url.parse(req.url, true);
    var filename = "http://azwejet.epizy.com/upload/" + req.params.id;
    console.log(filename)
    const file = `${__dirname+filename}`;
    res.download(file,(err)=>{
        console.log(err);
        if(err)
            res.status(err.statusCode).send();
    }); // Set disposition and send it.
}
