const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAUOJ5TD3TWTJPASW2",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const ses = new AWS.SES();

const params = {
  Template: {
    TemplateName: "Signup",
    SubjectPart: "Welcome to the ShiftBits fam.",
    HtmlPart: `<!DOCTYPE html>

    <html
      lang="en"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:v="urn:schemas-microsoft-com:vml"
    >
      <head>
        <title></title>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <!--[if mso
          ]><xml
            ><o:OfficeDocumentSettings
              ><o:PixelsPerInch>96</o:PixelsPerInch
              ><o:AllowPNG /></o:OfficeDocumentSettings></xml
        ><![endif]-->
        <!--[if !mso]><!-->
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans"
          rel="stylesheet"
          type="text/css"
        />
        <!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
    
          body {
            margin: 0;
            padding: 0;
          }
    
          th.column {
            padding: 0;
          }
    
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
    
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
    
          p {
            line-height: inherit;
          }
    
          @media (max-width: 720px) {
            .icons-inner {
              text-align: center;
            }
    
            .icons-inner td {
              margin: 0 auto;
            }
    
            .row-content {
              width: 100% !important;
            }
    
            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>
      <body
        style="
          background-color: #ffffff;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        "
      >
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          class="nl-container"
          role="presentation"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #ffffff;
          "
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-1"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content"
                          role="presentation"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                          width="700"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                "
                                width="50%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="divider_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 5px;
                                        padding-left: 5px;
                                        padding-right: 5px;
                                        padding-top: 15px;
                                      "
                                    >
                                      <div align="center">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                          "
                                          width="100%"
                                        >
                                          <tr>
                                            <td
                                              class="divider_inner"
                                              style="
                                                font-size: 1px;
                                                line-height: 1px;
                                                border-top: 0px solid #bbbbbb;
                                              "
                                            >
                                              <span></span>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="image_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-left: 15px;
                                        padding-right: 15px;
                                        width: 100%;
                                        padding-bottom: 5px;
                                      "
                                    >
                                      <div style="line-height: 10px">
                                        <a
                                          href="https://shiftbits.io/"
                                          style="outline: none"
                                          tabindex="-1"
                                          target="_blank"
                                          ><img
                                            alt="Your Logo"
                                            src="https://shiftbits-webapp.s3.ap-south-1.amazonaws.com/Logo_-_Copy.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                              width: 140px;
                                              max-width: 100%;
                                            "
                                            title="Your Logo"
                                            width="140"
                                        /></a>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                "
                                width="50%"
                              >
                                <table
                                  border="0"
                                  cellpadding="15"
                                  cellspacing="0"
                                  class="button_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div align="right">
                                        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://example.com" style="height:42px;width:94px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#21bf73"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><!
                                        [endif]--><a
                                          href="https://www.shiftbits.io/"
                                          style="
                                            text-decoration: none;
                                            display: inline-block;
                                            color: #ffffff;
                                            background-color: #21bf73;
                                            border-radius: 4px;
                                            width: auto;
                                            border-top: 0px solid #8a3b8f;
                                            border-right: 0px solid #8a3b8f;
                                            border-bottom: 0px solid #8a3b8f;
                                            border-left: 0px solid #8a3b8f;
                                            padding-top: 5px;
                                            padding-bottom: 5px;
                                            font-family: Arial, Helvetica Neue,
                                              Helvetica, sans-serif;
                                            text-align: center;
                                            mso-border-alt: none;
                                            word-break: keep-all;
                                          "
                                          target="_blank"
                                          ><span
                                            style="
                                              padding-left: 20px;
                                              padding-right: 20px;
                                              font-size: 16px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                            "
                                            ><span
                                              dir="ltr"
                                              style="
                                                font-size: 16px;
                                                line-height: 2;
                                                word-break: break-word;
                                                mso-line-height-alt: 32px;
                                              "
                                              >Sign up</span
                                            ></span
                                          ></a
                                        >
                                        <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-2"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                          width="700"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 10px;
                                  padding-bottom: 10px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="divider_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div align="center">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                          "
                                          width="100%"
                                        >
                                          <tr>
                                            <td
                                              class="divider_inner"
                                              style="
                                                font-size: 1px;
                                                line-height: 1px;
                                                border-top: 0px solid #bbbbbb;
                                              "
                                            >
                                              <span></span>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-3"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                          width="700"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                "
                                width="50%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="divider_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 20px;
                                        padding-left: 20px;
                                        padding-right: 20px;
                                        padding-top: 25px;
                                      "
                                    >
                                      <div align="center">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                          "
                                          width="100%"
                                        >
                                          <tr>
                                            <td
                                              class="divider_inner"
                                              style="
                                                font-size: 1px;
                                                line-height: 1px;
                                                border-top: 0px solid #bbbbbb;
                                              "
                                            >
                                              <span></span>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellspacing="0"
                                  class="heading_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <h1
                                        style="
                                          margin: 0;
                                          color: #454545;
                                          direction: ltr;
                                          font-family: Georgia, Times,
                                            'Times New Roman', serif;
                                          font-size: 37px;
                                          font-weight: normal;
                                          letter-spacing: normal;
                                          line-height: 130%;
                                          text-align: left;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                          padding-right: 15px;
                                        "
                                      >
                                        <strong
                                          >Your account has been activated!</strong
                                        >
                                      </h1>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div style="font-family: Arial, sans-serif">
                                        <div
                                          style="
                                            margin-left: -2%;
                                            font-size: 14px;
                                            color: #6f7077;
                                            line-height: 1.5;
                                            text-align: left;
                                            padding-right: 15px;
                                            font-family: 'Open Sans',
                                              'Helvetica Neue', Helvetica, Arial,
                                              sans-serif;
                                          "
                                        >
                                          <p>
                                            Thank you for signing up with India’s
                                            First Non-Custodial platform. You signed
                                            up for a unique cryptocurrency
                                            experience. We pride ourselves on the
                                            fact that our customers enjoy sole
                                            ownership of their crypto assets. Sit
                                            back and relax; you are all set to
                                            invest!
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                "
                                width="50%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="image_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        width: 100%;
                                        padding-right: 0px;
                                        padding-left: 0px;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                      "
                                    >
                                      <div align="center" style="line-height: 10px">
                                        <img
                                          alt="Services Company"
                                          src="https://shiftbits-webapp.s3.ap-south-1.amazonaws.com/99ec9898-7e84-460a-93c1-a1c42454a9d6.jpg"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                            width: 320px;
                                            max-width: 100%;
                                          "
                                          title="Services Company"
                                          width="320"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-4"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                          width="700"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="divider_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div align="center">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                          "
                                          width="100%"
                                        >
                                          <tr>
                                            <td
                                              class="divider_inner"
                                              style="
                                                font-size: 1px;
                                                line-height: 1px;
                                                border-top: 0px solid #bbbbbb;
                                              "
                                            >
                                              <span></span>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-5"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #fff;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            background-color: #21bf73;
                          "
                          width="700"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 25px;
                                  padding-bottom: 25px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="heading_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <h1
                                        style="
                                          margin: 0;
                                          color: #ffffff;
                                          direction: ltr;
                                          font-family: 'Helvetica Neue', Helvetica,
                                            Arial, sans-serif;
                                          font-size: 24px;
                                          font-weight: normal;
                                          letter-spacing: normal;
                                          line-height: 120%;
                                          text-align: center;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                        "
                                      >
                                        <strong
                                          >Once again, thank you for choosing
                                          ShiftBits</strong
                                        >
                                      </h1>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 10px;
                                        padding-left: 50px;
                                        padding-right: 50px;
                                        padding-top: 10px;
                                      "
                                    >
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            color: #393d47;
                                            line-height: 1.5;
                                            font-family: Arial, Helvetica Neue,
                                              Helvetica, sans-serif;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            <span style="color: #feffff"
                                              >We welcome you to the ShiftBits
                                              FAM!</span
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="button_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div align="center">
                                        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://example.com" style="height:42px;width:121px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#ffffff"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#454545; font-family:Arial, sans-serif; font-size:16px"><!
                                        [endif]--><a
                                          href="https://www.shiftbits.io/"
                                          style="
                                            text-decoration: none;
                                            display: inline-block;
                                            color: #454545;
                                            background-color: #ffffff;
                                            border-radius: 4px;
                                            width: auto;
                                            border-top: 0px solid #8a3b8f;
                                            border-right: 0px solid #8a3b8f;
                                            border-bottom: 0px solid #8a3b8f;
                                            border-left: 0px solid #8a3b8f;
                                            padding-top: 5px;
                                            padding-bottom: 5px;
                                            font-family: Arial, Helvetica Neue,
                                              Helvetica, sans-serif;
                                            text-align: center;
                                            mso-border-alt: none;
                                            word-break: keep-all;
                                          "
                                          target="_blank"
                                          ><span
                                            style="
                                              padding-left: 20px;
                                              padding-right: 20px;
                                              font-size: 16px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                            "
                                            ><span
                                              style="
                                                font-size: 16px;
                                                line-height: 2;
                                                word-break: break-word;
                                                mso-line-height-alt: 32px;
                                              "
                                              >Get Started</span
                                            ></span
                                          ></a
                                        >
                                        <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-6"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                          width="700"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="divider_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div align="center">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                          "
                                          width="100%"
                                        >
                                          <tr>
                                            <td
                                              class="divider_inner"
                                              style="
                                                font-size: 1px;
                                                line-height: 1px;
                                                border-top: 0px solid #bbbbbb;
                                              "
                                            >
                                              <span></span>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-7"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #f7fafe;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                          width="700"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 25px;
                                  padding-bottom: 5px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="heading_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <h2
                                        style="
                                          margin: 0;
                                          color: #2b2d2d;
                                          direction: ltr;
                                          font-family: 'Helvetica Neue', Helvetica,
                                            Arial, sans-serif;
                                          font-size: 30px;
                                          font-weight: normal;
                                          letter-spacing: normal;
                                          line-height: 120%;
                                          text-align: center;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                        "
                                      >
                                        <strong>Get to know us better!</strong>
                                      </h2>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 10px;
                                        padding-left: 50px;
                                        padding-right: 50px;
                                        padding-top: 10px;
                                      "
                                    >
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            color: #6f7077;
                                            line-height: 1.5;
                                            font-family: Arial, Helvetica Neue,
                                              Helvetica, sans-serif;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            We will be right back.<br />Meanwhile,
                                            you can follow our social media
                                            platforms!
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-8"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #f7fafe;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                          width="700"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 25px;
                                  padding-bottom: 5px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="divider_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div align="center">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                          "
                                          width="100%"
                                        >
                                          <tr>
                                            <td
                                              class="divider_inner"
                                              style="
                                                font-size: 1px;
                                                line-height: 1px;
                                                border-top: 0px solid #bbbbbb;
                                              "
                                            >
                                              <span></span>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-9"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #fff;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            background-color: #21bf73;
                          "
                          width="700"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="social_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <table
                                        align="center"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="social-table"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="216px"
                                      >
                                        <tr>
                                          <td style="padding: 0 2px 0 2px">
                                            <a
                                              href="https://www.facebook.com/ShiftBitsofficial/"
                                              target="_blank"
                                              ><img
                                                alt="Facebook"
                                                height="32"
                                                src="https://shiftbits-webapp.s3.ap-south-1.amazonaws.com/facebook2x.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="facebook"
                                                width="32"
                                            /></a>
                                          </td>
                                          <td style="padding: 0 2px 0 2px">
                                            <a
                                              href="https://twitter.com/ShiftbitsIo"
                                              target="_blank"
                                              ><img
                                                alt="Twitter"
                                                height="32"
                                                src="https://shiftbits-webapp.s3.ap-south-1.amazonaws.com/twitter2x.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="twitter"
                                                width="32"
                                            /></a>
                                          </td>
                                          <td style="padding: 0 2px 0 2px">
                                            <a
                                              href="https://www.linkedin.com/company/69866419/admin/"
                                              target="_blank"
                                              ><img
                                                alt="Linkedin"
                                                height="32"
                                                src="https://shiftbits-webapp.s3.ap-south-1.amazonaws.com/linkedin2x.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="linkedin"
                                                width="32"
                                            /></a>
                                          </td>
                                          <td style="padding: 0 2px 0 2px">
                                            <a
                                              href="https://www.instagram.com/shiftbitsofficial/"
                                              target="_blank"
                                              ><img
                                                alt="Instagram"
                                                height="32"
                                                src="https://shiftbits-webapp.s3.ap-south-1.amazonaws.com/instagram2x.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="instagram"
                                                width="32"
                                            /></a>
                                          </td>
                                          <td style="padding: 0 2px 0 2px">
                                            <a
                                              href="https://medium.com/@ShiftBits"
                                              target="_blank"
                                              ><img
                                                alt="Medium"
                                                height="32"
                                                src="https://shiftbits-webapp.s3.ap-south-1.amazonaws.com/medium2x.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="Medium"
                                                width="32"
                                            /></a>
                                          </td>
                                          <td style="padding: 0 2px 0 2px">
                                            <a
                                              href="https://www.youtube.com/channel/UCQ_tXF8jcwsyqx-3SfC7Wbw"
                                              target="_blank"
                                              ><img
                                                alt="YouTube"
                                                height="32"
                                                src="https://shiftbits-webapp.s3.ap-south-1.amazonaws.com/youtube2x.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="YouTube"
                                                width="32"
                                            /></a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 10px;
                                        padding-left: 50px;
                                        padding-right: 50px;
                                        padding-top: 10px;
                                      "
                                    >
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            color: #6f7077;
                                            line-height: 1.5;
                                            font-family: Arial, Helvetica Neue,
                                              Helvetica, sans-serif;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            <span style="color: #feffff"
                                              >This is an automated email. Please do
                                              not reply to it as there wont be
                                              any</span
                                            >
                                          </p>
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            <span style="color: #feffff"
                                              >reply back.</span
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 10px;
                                        padding-left: 50px;
                                        padding-right: 50px;
                                        padding-top: 10px;
                                      "
                                    >
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            color: #6f7077;
                                            line-height: 1.5;
                                            font-family: Arial, Helvetica Neue,
                                              Helvetica, sans-serif;
                                          "
                                        >
                                          <!-- <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                              mso-line-height-alt: 15px;
                                            "
                                          >
                                            <span
                                              style="
                                                color: #ffffff;
                                                font-size: 10px;
                                              "
                                              ><a
                                                href="http://example.com"
                                                rel="noopener"
                                                style="
                                                  text-decoration: none;
                                                  color: #ffffff;
                                                "
                                                target="_blank"
                                                >UNSUBSCRIBE</a
                                              ></span
                                            >
                                          </p> -->
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-10"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                          width="700"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                "
                                width="100%"
                              >
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End -->
      </body>
    </html>`,
    TextPart:
      "Your account has been activated!\r\nThank you for signing up with India’s First Non-Custodial platform. You signed up for a unique cryptocurrency experience. We pride ourselves on the fact that our customers enjoy sole ownership of their crypto assets.Sit back and relax; you are all set to invest!\r\n Once again, thank you for choosing ShiftBits.\r\nTeam ShiftBits.",
  },
};

ses.createTemplate(params, (err, data) => {
  // ses.updateTemplate(params, (err, data) => {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log("here", data); // successful response
});
