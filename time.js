var parseString = require('xml2js').parseString;
var xml = '<?xml version="1.0" encoding="UTF-8"?>\
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope">\
    <SOAP-ENV:Body>\
        <ns0:Payment xmlns:ns0="http://www.kotak.com/schemas/CMS_Generic/Payment_Response.xsd">\
            <ns0:AckHeader>\
                <ns0:MessageId>05072021_45435</ns0:MessageId>\
                <ns0:StatusCd>000</ns0:StatusCd>\
                <ns0:StatusRem>All Instruments accepted Successfully.</ns0:StatusRem>\
            </ns0:AckHeader>\
        </ns0:Payment>\
    </SOAP-ENV:Body>\
</SOAP-ENV:Envelope>';
parseString(xml, function (err, result) {
    console.log(result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0]["ns0:Payment"][0]["ns0:AckHeader"][0]["ns0:MessageId"][0]);
});