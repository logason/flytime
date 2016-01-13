'use strict';

module.exports = (flight, type, follower) => {
  const location    = flight.location,
        scheduled   = flight.scheduled,
        estimated   = flight.estimated,
        status      = flight.status,
        flightNum   = flight.flightNum;

  const appUrl      = process.env.APP_URL;
  const airlineLogo = `${appUrl}/img/airlines/${flight.airline.toLowerCase().replace(' ','%20')}.png`;
  const isArrival = type === 'arrivals';

  return `
    <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
    <html xmlns='http://www.w3.org/1999/xhtml' xmlns='http://www.w3.org/1999/xhtml'>
      <head>
        <meta content='text/html; charset=utf-8' http-equiv='Content-Type'>
        <meta content='width=device-width' name='viewport'>
        <title>Flight ${flightNum} updated</title>
      </head>
    	<body style='width: 100%; min-width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 14px; color: #607D8B; margin: 0; padding: 50px 0 0;'>
    		<center style='width: 100%; min-width: 580px;'>
    		  <table class='container' style='border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: inherit; width: 580px; margin: 0 auto; padding: 0;'>
    		    <tr align='left' style='vertical-align: top; text-align: left; padding: 0;'>
    		      <td align='left' class='wrapper last' style='word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: top; text-align: left; position: relative; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 14px; height: 30px; margin: 0; padding: 10px 0px 0px;' valign='top'>
    		        <table class='twelve columns' style='border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 580px; margin: 0 auto; padding: 0;'>
    		          <tr align='left' style='vertical-align: top; text-align: left; padding: 0;'>
    		            <td align='left' class='three sub-columns logo-container' style='text-align: center; word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: middle; text-align: left; min-width: 0px; width: 25%; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 14px; height: 30px; margin: 0; padding: 10px;' valign='middle'>
    									<img align='left' class='airline-logo' src='${airlineLogo}' style='outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; width: auto; max-width: 150px; float: left; clear: both; display: block; max-height: 60px; padding: 0;'>
    								</td>
    		            <td align='left' class='flightnum three sub-columns' style='word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: middle; text-align: left; min-width: 0px; width: 25%; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 25px; height: 100%; border-left-width: 1px; border-left-color: #607D8B; border-left-style: solid; margin: 0; padding: 10px;' valign='middle'>
    									${flightNum}
    								</td>
    		            <td align='right' class='six sub-columns last' style='text-align: right; vertical-align: middle; word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; min-width: 0px; width: 50%; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 14px; height: 30px; margin: 0; padding: 0px 0px 10px;' valign='middle'></td>
    		            <td align='left' class='expander' style='word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: top; text-align: left; visibility: hidden; width: 0px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 14px; height: 30px; margin: 0; padding: 0;' valign='top'></td>
    		          </tr>
    		        </table>
    		        <table class='twelve columns' style='border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 580px; margin: 0 auto; padding: 0;'>
    		          <tr align='left' class='twelve' style='vertical-align: top; text-align: left; padding: 0;'>
    		            <td align='center' class='flight-grahpic-container' style='word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: top; text-align: center; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 14px; height: 30px; margin: 0; padding: 50px 90px 20px;' valign='top'>
    									<img align='left' class='flight-grahpic' src='${appUrl}/img/flight.png' style='outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; width: 400px; max-width: 100%; float: left; clear: both; display: block; text-align: center;' width='200'>
    								</td>
    		          </tr>
    		        </table>
    		        <table class='twelve' style='border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 580px; padding: 0;'>
    		          <tr align='left' class='twelve' style='vertical-align: top; text-align: left; padding: 0;'>
    		            <td align='left' class='six location' style='word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: top; text-align: left; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 25px; height: 30px; margin: 0; padding: 0 0 0 40px;' valign='top'>
    									${isArrival ? location : 'Keflavík'}
    								</td>
    		            <td align='right' class='six location right' style='word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: top; text-align: right; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 25px; height: 30px; margin: 0; padding: 0 40px;' valign='top'>
    									${isArrival ? 'Keflavík' : location}
    								</td>
    		          </tr>
    		        </table>
    		        <table class='twelve info' style='border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 580px; margin-top: 50px; padding: 0;'>
    		        	<tr align='left' class='twelve info-header' style='vertical-align: top; text-align: left; padding: 0;'>
    		            <td align='center' bgcolor='#607D8B' class='three' style='word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: middle; text-align: center; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 12px; height: 30px; color: #fff; background: #607D8B; margin: 0; padding: 0; border: 3px solid #fff;' valign='middle'>
    									SCHEDULED
    								</td>
    		            <td align='center' bgcolor='#607D8B' class='six' style='word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: middle; text-align: center; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 12px; height: 30px; color: #fff; background: #607D8B; margin: 0; padding: 0; border: 3px solid #fff;' valign='middle'>
    									STATUS
    								</td>
    		          </tr>
    		          <tr align='left' class='twelve info-content' style='vertical-align: top; text-align: left; padding: 0;'>
    		            <td align='center' class='three' style='word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: middle; text-align: center; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 22px; height: 30px; margin: 0; padding: 10px;' valign='middle'>
    									${scheduled}
    								</td>
    		            <td align='center' class='six' style='word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: middle; text-align: center; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 22px; height: 30px; margin: 0; padding: 10px;' valign='middle'>
    									${status}
    								</td>
    		          </tr>
    		        </table>
    		        <table class='twelve message' style='border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 580px; margin-top: 120px; padding: 0;'>
    		        	<tr align='center' class='twelve' style='vertical-align: top; text-align: center; padding: 0;'>
    		          	<td align='center' style='word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse; vertical-align: top; text-align: center; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 14px; height: 30px; margin: 0; padding: 0;' valign='top'>
    		              You are receiving this email because you are
    		              following this flight on <a href='http://flytime.is' style='color: #FF5722; text-decoration: none;'target='_blank'>flytime.is</a>.
    									<br /><a href='http://flytime.is/unfollow/${follower}'style='color: #FF5722; text-decoration: none;'target='_blank'>Click here to unfollow</a>.
    		            </td>
    		          </tr>
    		        </table>
    		      </td>
    		    </tr>
    		  </table>
    		</center>
    	</body>
    </html>
  `
}
