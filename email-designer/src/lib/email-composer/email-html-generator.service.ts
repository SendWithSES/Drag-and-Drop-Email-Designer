import { Injectable } from '@angular/core';
import { BlockBean, BlockType, Brand, EmailElements, Footer, Logo, Structure } from './models';
import { ConstantsData } from './constants';

@Injectable({
  providedIn: 'root'
})
export class EmailHtmlGeneratorService {
  defaultFont = 'Verdana,sans-serif';
  unsubscribePath = `/unsubscribe`;
  constructor() { }

  getResetStyles() {
    return `
            :root {
                color-scheme: light;
                supported-color-schemes: light;
            }
    
            html,
            body {
                margin: 0 auto !important;
                padding: 0 !important;
                height: 100% !important;
                width: 100% !important;
            }
    
            * {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
    
            div[style*="margin: 16px 0"] {
                margin: 0 !important;
            }
    
            #MessageViewBody,
            #MessageWebViewDiv {
                width: 100% !important;
            }
    
            table,
            td {
                mso-table-lspace: 0pt !important;
                mso-table-rspace: 0pt !important;
            }
    
            table {
                border-spacing: 0 !important;
                border-collapse: collapse !important;
                table-layout: fixed !important;
                margin: 0 auto !important;
            }
            .email-center-table > tbody > tr:last-child > td { padding-bottom: 20px; }
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            a {
                text-decoration: none;
                height:100%;
            }
    
            a[x-apple-data-detectors],
            .unstyle-auto-detected-links a,
            .aBn {
                border-bottom: 0 !important;
                cursor: default !important;
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            .im {
                color: inherit !important;
            }
    
            .a6S {
                display: none !important;
                opacity: 0.01 !important;
            }
    
            img.g-img+div {
                display: none !important;
            }
    
            
            @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                u~div .email-container {
                    min-width: 320px !important;
                }
            }
    
            @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                u~div .email-container {
                    min-width: 375px !important;
                }
            }
    
            @media only screen and (min-device-width: 414px) {
                u~div .email-container {
                    min-width: 414px !important;
                }
            }
    `
  }
  getStyles() {
    return `
    body {
      font-family: ${this.defaultFont};
    }
    @media screen and (max-width: 600px) {

        .stack-column,
        .stack-column-center {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            direction: ltr !important;
        }

        .stack-column-center {
            text-align: center !important;
        }

        .center-on-narrow {
            text-align: center !important;
            display: block !important;
            margin-left: auto !important;
            margin-right: auto !important;
            float: none !important;
        }

        table.center-on-narrow {
            display: inline-block !important;
        }

        
    }

    /* Text Body content styles */
    .email-text-content{
      font-style: normal;
      word-wrap: break-word;
      word-break: break-word;
      text-align: left;
      color : #333;
    }
    .email-text-content h1 {
      font-size: 28px;
      font-weight: normal;
      /* color: #333; */
      margin: 0px 0px 2px 0px !important;
      line-height: normal !important;
    }
    .email-text-content h2 {
        font-size: 26px;
        font-weight: normal;
        /* color: #333; */
        margin: 0px 0px 2px 0px !important;
        line-height: normal !important;
    }
    .email-text-content h3 {
        font-size: 22px;
        font-weight: normal;
        /* color: #333; */
        margin: 0px 0px 2px 0px !important;
        line-height: normal !important;
    }
    .email-text-content p {
      font-size: 16px;
      /* color: #333; */
      margin: 0px 0px 2px 0px !important;
      line-height: normal !important;
    }
    .email-text-content ul,
    .email-text-content ol {
      /*font-size: 16px;*/     
      /*line-height: 35px;*/
      margin: 10px 0px 14px 0px;
      line-height: normal;
    }
    .email-text-content li {
      /* margin-left: 0px; */
      margin: 4px 0px 4px 0px !important;
    }
  /* Text Body content styles Ends */
  `
  }
  getPlainTextStyles(isPreview = false) {
    const ww = isPreview ? 'word-wrap: break-word;' : ''
    return `body {
      ${ww}
    font-family: ${this.defaultFont};
  }
    a{text-decoration: none;} 
    p{font-family: ${this.defaultFont};font-size: 14px; margin:0 0 16px 0 !important;padding:0 !important;line-height: 160%;}
    ul{font-family: ${this.defaultFont};font-size: 14px;line-height: 20px;margin:0px 0px 14px 0px !important;}
    ol{font-family: ${this.defaultFont};font-size: 14px;line-height: 20px;margin:0px 0px 14px 0px !important}
    `
  }
  getHtmlEditorStyles() {
    return `
    <style>
    body {
      word-wrap: break-word;
      font-family: ${this.defaultFont};
    }
    </style>`
  }
  getHead(plainText = false, isPreview = false) {
    return `
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
        
        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">
        <title></title>
    
        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if mso]>
            <style>
               /*  * {
                    font-family: ${this.defaultFont};
                } */
            </style>
        <![endif]-->
        <style>
            ${this.getResetStyles()}
        </style>
        <style>
          ${!plainText ? this.getStyles() : this.getPlainTextStyles(isPreview)}
        </style>
    </head>
    `
  }
  getEmailHtml(emailElements: EmailElements, isPreview = false) {
    const bgColor = (emailElements.general.background) ? emailElements.general.background : ConstantsData.bgPickerValue;
    const contentBgColor = (emailElements.general.contentBackground) ? emailElements.general.contentBackground : ConstantsData.contentBgValue;

    let html = `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
    
    ${this.getHead()}
    
    
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: ${bgColor};">
        <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: ${bgColor};">
            <!--[if mso | IE]>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${bgColor};">
        <tr>
        <td>
        <![endif]-->
    
            <div style="max-width: 680px; margin: 0 auto;overflow: auto;
            border-left: 5px solid ${bgColor};
            border-right: 5px solid ${bgColor};" class="email-container">
                <!--[if mso]>
                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="680">
                <tr>
                <td>
                <![endif]-->
                ${this.getSpacer(5, 10)}
                <table class="email-center-table" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;background-color:${contentBgColor};
                ">
                <tr>
                <td>
                ${this.getSpacer(5, 10)}
                </td>
            </tr>
                `
    if (emailElements.general && emailElements.general.logo && emailElements.general.logo.src) {
      html += this.getLogo(emailElements.general.logo)

    }

    if (emailElements && emailElements.structures && emailElements.structures.length) {
      for (const structure of emailElements.structures) {
        html += this.getStructure(structure, contentBgColor);
      }
    }


    html += `</table>`
    if (emailElements.general && emailElements.general.footer && emailElements.general.footer) {
      html += this.getFooter(emailElements.general.footer, isPreview)

    }
    html += `<!--[if mso]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </div>
            ${this.getSpacer()}
            <!--[if mso | IE]>
              </td>
              </tr>
              </table>
              <![endif]-->
              </center>
              </body>

              </html>`;

    return html;
  }
  getSpacer(padding = 20, lineHeight = 20) {
    return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tbody>
                <tr>
                  <td>
                    <div align="center" style="max-width: 680px; margin: auto;" class="email-container">
                        <!--[if mso]>
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center">
                        <tr>
                        <td>
                        <![endif]-->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tbody><tr>
                                <td style="padding: ${padding / 2}px; line-height: ${lineHeight}px;">
                                    <p style="margin: 0;">&nbsp;</p>
                                </td>
                            </tr>
                        </tbody></table>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
    `
  }
  getStructure(structure: Structure, contentBgColor: string) {
    let structureHtml = '';

    if (structure.blocks && structure.blocks.length && structure.blocks[0] && structure.blocks[0].length) {
      if (structure.type === '1') {
        structureHtml += `<tr>
        <td style="background-color: ${contentBgColor};padding: 0 20px;">`
        for (const block of structure.blocks[0]) {
          structureHtml += this.getBlock(block, 1)
        }
        structureHtml += `</td></tr>`;

      } else if (structure.type === '2') {
        structureHtml += `<tr>
                    <td align="center" valign="top" style="font-size:0; padding: 0 10px; background-color: ${contentBgColor};">
                        <!--[if mso]>
                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="660">
                        <tr>
                        <td valign="top" width="330">
                        <![endif]-->
                        <div style="display:inline-block; margin: 0 -1px; width:100%; min-width:200px; max-width:330px; vertical-align:top;"
                            class="stack-column">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 0 10px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                                            width="100%" style="font-size: 14px; text-align: left;">
                                            `;
        for (const block of structure.blocks[0]) {
          structureHtml += `<tr>
                                                  <td style="padding: 0px;">`
          structureHtml += this.getBlock(block, 2);
          structureHtml += `</td>
                                            </tr>`
        }
        structureHtml += `
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso]>
                        </td>
                        <td valign="top" width="330">
                        <![endif]-->
                        <div style="display:inline-block; margin: 0 -1px; width:100%; min-width:200px; max-width:330px; vertical-align:top;"
                            class="stack-column">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 0 10px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                                            width="100%" style="font-size: 14px;text-align: left;">
                                            `;
        for (const block of structure.blocks[1]) {
          structureHtml += `<tr>
                                                  <td style="padding: 0px;">`
          structureHtml += this.getBlock(block, 2);
          structureHtml += `</td>
                                            </tr>`
        }
        structureHtml += `
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                </tr>`
      }

    }

    return structureHtml;
  }
  getLogo(logo: Logo) {
    const logoText = `
    <img src="${logo.src}" width="${logo.width ? logo.width : ''}" height=""  border="0"
                style="height: auto;max-width:100%;font-family: ${this.defaultFont}; font-size: 15px; line-height: 15px;"  alt="${logo.altTxt ? logo.altTxt : 'image'}" onerror="this.src='';">
    `
    let linkText = logoText;
    if (logo.link) {
      linkText = `<a href="${logo.link}">
            ${logoText}
      </a>`
    }
    return `
    <tr>
      <td style="padding: 0 20px 20px 20px; text-align: ${logo.align ? logo.align : 'center'}">
        ${linkText}
      </td>
    </tr>`
  }
  getFooter(footer: Footer, isPreview: boolean) {
    let brandsText = ``;
    if (footer.brands && footer.brands.length) {
      brandsText += `
      <tr>
    <td align="center" style="font-size:0;padding:20px 20px 0 20px;word-break:break-word">
      `
      for (const brand of footer.brands) {
        brandsText += this.getBrand(brand, isPreview)
      }
      brandsText += `
      </td>
      </tr>
      `
    }

    const resetStyles = "text-decoration: none;font-weight: normal;padding:0;";
    const path = isPreview ? this.unsubscribePath : "{{Unsubscribe}}"
    const unsubscribe = footer.unsubscribe ? `<span 
    style="${resetStyles}font-family: ${footer.font ? this.getFontFamily(footer.font) : this.defaultFont};font-size:${footer.fontSize || '14px'};color:${footer.unsubscribeColor || ConstantsData.defaultUnsubscribeColor}">
    <a style="${resetStyles}font-family: ${footer.font ? this.getFontFamily(footer.font) : this.defaultFont};font-size:${footer.fontSize || '14px'};color:${footer.unsubscribeColor || ConstantsData.defaultUnsubscribeColor}"
    href="${path}" target="_blank">Unsubscribe</a>
    </span>` : '';
    return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="max-width: 680px;">

                ${brandsText}
                <tr>
                    <td
                        style="font-family: ${this.defaultFont};
                        line-height: 120%; text-align: center;padding: 0 20px;
                        font-size: 14px;font-weight: 400;color:#aaa;word-wrap:break-word;"
                        class="footer-text">
                        <!--[if mso]> 
                        <table role="presentation" align="center" style="width:100%;"> 
                        <tr> 
                        <td style="${resetStyles}word-wrap:break-word;max-width:630px;margin:20px;font-family: ${footer.font ? this.getFontFamily(footer.font) : this.defaultFont};font-size:${footer.fontSize ? footer.fontSize : '14px'}"> 
                        <![endif]-->

                        ${footer.content}
                        <!--[if mso]> 
                        </td> 
                        </tr> 
                        </table> 
                        <![endif]-->
                        
                        <div 
                        style="${resetStyles}margin:20px 10px;font-family: ${footer.font ? this.getFontFamily(footer.font) : this.defaultFont};font-size:${footer.fontSize ? footer.fontSize : '14px'}">
                        ${unsubscribe}
                        </div>
                        <br><br>
                        
                    </td>
                </tr>
            </table>
    `
  }
  getBrand(brand: Brand, isPreview: boolean) {
    if (!brand.link || (!isPreview && !brand.src)) {
      return '';
    }
    let iconContent: any = brand.iconName;
    if (isPreview) {
      iconContent = brand.svgTxt;
    } else {
      iconContent = `<img height="30" src="${brand.src}" style="border-radius:3px;display:block" alt="${brand.iconName}">`;
    }
    return `
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="float:none;display:inline-table">
            <tbody>
                <tr>
                    <td style="padding:4px 4px 4px 4px;vertical-align:middle">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                            style="border-radius:3px;width:auto">
                            <tbody>
                                <tr>
                                    <td style="font-size:0;height:30px;vertical-align:middle;width:auto;">
                                    <a href="${brand.link}" target="_blank">
                                      ${iconContent}
                                    </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table><!--[if mso | IE]></td><td><![endif]-->
    `
  }

  getBlock(block: BlockBean, cols: number = 1) {
    if (((block.type === BlockType.Image || block.type === BlockType.Video) && (!block.src && !block.imageUrl))
      || ((block.type === BlockType.Body || block.type === BlockType.Text || block.type === BlockType.Button) && !block.content)) {
      return '';
    }
    let tdAlign = `text-align: center;`
    let trAlign = 'align="center"';
    if (block.type === BlockType.Text || block.type === BlockType.Body) {
      tdAlign = `text-align: left;`
      trAlign = 'align="left"'
    }
    if (block.align) {
      tdAlign = `text-align: ${block.align};`
      trAlign = `align="${block.align}"`;
    }
    if (block.type === BlockType.Image) {
      tdAlign = `text-align: center;`
      trAlign = 'align="center"'
    }
    let blockHtml = `<table ${trAlign}  role="presentation" cellspacing="0" cellpadding="0" border="0"
    style="margin: auto;width:100%;">
    <tr>`;
    const addCellContent = (content: string) => {
      blockHtml += `<td style="padding:0 0 20px 0;${tdAlign}">${content}</td>`;
    };
    switch (block.type) {
      case BlockType.Text:
        if (block.content != ConstantsData.headerTextContent) {
          // blockHtml += this.getText(block);
          addCellContent(this.getText(block));
        }
        break;
      case BlockType.Body:
        if (block.content != ConstantsData.bodyTextContent) {
          addCellContent(this.getBody(block));
        }
        break;
      case BlockType.Button:
        addCellContent(this.getButton(block));
        break;
      case BlockType.Image:
        addCellContent(this.getImage(block, cols));
        // blockHtml += this.getImage(block, cols);
        break;
      case BlockType.Video:
        addCellContent(this.getVideo(block, cols));
        break;
      case BlockType.Divider:
        addCellContent(this.getDivider(block));
        break;
    }
    blockHtml += `</tr></table>`
    return blockHtml;
  }
  getDivider(block: BlockBean) {
    return `<p style="border-top:solid 2px ${block.color};font-size:1px;margin:0 auto;width:100%"></p>`
  }

  addMarginToTags(content: string, tags: string[]): string {
    const tagPattern = new RegExp(`<(${tags.join('|')})([^>]*)>`, 'gi');
    const stylesToAppend = `margin:0px 0px 2px 0px;`;

    return content.replace(tagPattern, (match, tag, attrs) => {
      const hasStyle = /style\s*=\s*["']([^"']*)["']/.test(attrs);
      if (hasStyle) {
        // Append styles to existing style attribute
        return `<${tag}${attrs.replace(/style\s*=\s*["']([^"']*)["']/, (styleMatch: any, existingStyles: any) => {
          return `style="${existingStyles}; ${stylesToAppend}"`;
        })}>`;
      } else {
        // No style present, add one
        return `<${tag}${attrs} style="${stylesToAppend}">`;
      }
    });
  }

  getText(block: BlockBean) {
    let text = '';
    if (block.content) {
      text = `
        <table role="presentation" cellspacing="0" cellpadding="0" border="0"
        style="margin: auto;width: 100%;">
          <tr>
            <td class="email-text-content" style="font-family: ${this.defaultFont};">
            ${this.addMarginToTags(block.content, ['h1', 'h2', 'h3'])}
            </td>
          </tr>
        </table>
      `
      // ${block.content} line 630
    }
    return text;
  }
  getBody(block: BlockBean) {
    let text = '';
    if (block.content) {
      text = `
        <table role="presentation" cellspacing="0" cellpadding="0" border="0"
        style="margin: auto;width: 100%;">
          <tr>
            <td class="email-text-content" style="font-family: ${this.defaultFont}">
              ${this.addMarginToTags(block.content, ['p'])}
            </td>
          </tr>
        </table>
      `
    }
    return text;
  }
  getImage(block: BlockBean, cols: number) {
    const src = block.imgCreatFrom === 'imgRepo' ? block.src : block.imageUrl;
    if (!src) return ''; // <-- prevent rendering when there's no src
  
    const width = block.width || '100%';
    const lineHeight = cols === 1 ? '15px' : '20px';
    const imgClass = cols === 1 ? 'g-img' : 'center-on-narrow';
    const style = `max-width: 100%; height: auto; line-height: ${lineHeight}; ${cols === 1 ? 'margin: auto; display: block;' : ''}`;
  
    let imageText = `
      <img src="${src}" width="${width}" height="" border="0"
           style="${style}" class="${imgClass}"
           alt="${block.altTxt || 'image'}" onerror="this.src='';">
    `;
  
    if (block.link) {
      imageText = `<a href="${block.link}" target="_blank" title="alt test">${imageText}</a>`;
    }

    return imageText;

    /*  let imageText = '';
     if (block.src) {
       if (cols === 1) {
         imageText = `
         <img src="${block.src}" width="${block.width ? block.width : '100%'}" height="" border="0"
         style="max-width: 100%; height: auto; 
          line-height: 15px;  margin: auto; display: block;"
         class="g-img" alt="${block.altTxt || 'image'}" onerror="this.src='';">             
         `
       } else {
         imageText = `
         <img src="${block.src}" width="${block.width ? block.width : '100%'}" height=""
         border="0"
         style="max-width: 100%; height: auto; line-height: 20px; "
         class="center-on-narrow" alt="${block.altTxt || 'image'}" onerror="this.src='';">
         `
       }
       if (block.link) {
         imageText = `<a href="${block.link}" target="_blank" title="alt test">${imageText}</a>`
       }
     }
 
     return imageText; */
  }
  getVideo(block: BlockBean, cols: number) {
    let imageText = '';
    if (block.src) {
      const tableBodyElem =
        ` <tr>
            <td></td>
            <td rowspan="2"> 
              <img src="${block.src}" width="100%" style="max-width: 100%; height: auto; display: block;" alt="${block.altTxt || 'image'}" onerror="this.src='';">
            </td>
          </tr>
          <tr>
            <td colspan="2" style='text-align:center;'>
             <span style='background-color: transparent !important;background:none;display:inline-block;width: 0;height:0;border-top: 20px solid transparent;border-bottom: 20px solid transparent;border-left: 30px solid red;'></span>
            </td>
          </tr>`
      if (cols === 1) {
        imageText = `
              <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto !important">
                ${tableBodyElem} 
              </table>`
      } else {
        imageText = `
              <table border="0" cellpadding="0" cellspacing="0">
                ${tableBodyElem} 
              </table>`
      }
      if (block.link) {
        imageText = `<a href="${block.link}" target="_blank" title="alt test">${imageText}</a>`
      }
    }
    return imageText;
  }

  getButton(block: BlockBean) {
    let hrefText = ' href="#"';
    if (block.link) {
      hrefText = ` href="${block.link}"`
    }
    let tAlign = 'align="center"';
    let tdAlignStyle = `text-align: center;`
    if (block.align) {
      tAlign = `align="${block.align}"`;
      tdAlignStyle = `text-align: ${block.align};`
    }
    let btnContent = ``;
    if (block.link) {
      btnContent = `
      <a ${hrefText}
        class="button-a button-a-primary"
        target="_blank"
        style="background: ${block.backgroundColor}; 
        color: ${block.color}; 
        font-family: ${block.font ? this.getFontFamily(block.font) : this.defaultFont}; 
        font-size: ${block.fontSize ? block.fontSize : '16px'};
        text-decoration: none; 
        display: block; 
        font-style: normal;
        font-weight: bold;
        padding: 12px 25px;
        border: 0px solid rgb(65, 65, 65);
        border-radius: 3px;
        line-height: 120%;
        cursor:pointer;
        ">
      ${block.content}
      </a>
      `
    } else {
      btnContent = `<p 
      style="
      display:inline-block;
      background:${block.backgroundColor};
      color:${block.color};
      font-family: ${block.font ? this.getFontFamily(block.font) : this.defaultFont}; 
      font-size: ${block.fontSize ? block.fontSize : '16px'};
      font-weight:bold;
      line-height:120%;
      margin:0;
      text-decoration:none;
      text-transform:none;
      padding:10px 25px;
      mso-padding-alt:0px;
      border-radius:3px;
      ">${block.content}</p>`
    }
    return `
      <table ${tAlign} role="presentation" cellspacing="0" cellpadding="0" border="0"
          style="margin: auto;${tdAlignStyle}">
          <tr>
              <td class="button-td button-td-primary"  ${tAlign}
                  style="border-radius: 4px; background: ${block.backgroundColor};${tdAlignStyle}">
                  ${btnContent}
              </td>
          </tr>
      </table>
    `
  }
  getFontFamily(font: string) {
    let fontFamily = `'${font}',sans-serif`
    if (font === 'Georgia' || font === 'Courier New') {
      fontFamily = `'${font}',serif`
    }
    return fontFamily
  }
  getPainTextHTML(emailContent: EmailElements, isPreview = false) {
    const bgColor = ConstantsData.bgPickerValue;
    const contentBgColor = ConstantsData.contentBgValue;

    let html = `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
      ${this.getHead(true, isPreview)} 
      <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;">
        <center role="article" aria-roledescription="email" lang="en" style="width: 100%;">
          <table class="email-center-table" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;color: #333;">     
            <tr>
              <td style="padding:0 10px;">
              ${emailContent}
              ${this.getSpacer(5, 10)}
              </td>
            </tr> 
          </table>      
        </center>
      </body>
    </html>`;

    return html;
  }
}
