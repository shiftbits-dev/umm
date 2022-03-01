const zendesk = require("node-zendesk");
const Utility = require("../utility/util");
const httpStatus = require("../exception/httpstatus.json");
const PGDB = require("../config/db");
const i18n = require("i18n");
const got = require("got");
const client = zendesk.createClient({
	username: AppConfig.USER_NAME_ZEN,
	password: AppConfig.PASSWORD_ZEN,
	remoteUri: AppConfig.REMOTEURI
})


module.exports = {

	//Raise Request
	raiseRequest: async (req, res, next) => {
		try {
			const reqObj = {
				subject: req.body.subject,
				body: req.body.body
			}

			const userPayload = req.user;

			// const ticket = {
			//     "ticket":
			//     {
			//         "subject": `${reqObj["subject"]}`,
			//         "comment": {
			//             "body": `${reqObj["body"]}`
			//         },
			//         "email": "roge@example.org",
			//     }
			// };

			const ticket = {
				"request":
				{
					"subject": `${reqObj["subject"]}`,
					"comment": {
						"body": `${reqObj["body"]}`
					},
					"requester": {
						"name": userPayload["firstName"] + " " + userPayload["lastName"],
						"email": userPayload["email"]
					},
				}
			};
			const result = await client.requests.create(ticket);

			let requestResponse = await PGDB.pg.models.help.create({
				userId: userPayload["userId"],
				zendeskId: result["id"],
				url: result["url"],
				subject: result["subject"],
				description: result["description"],
				status: result["status"],
				requesterId: result["requester_id"],
			}, {
				plain: true,
				nest: true
			});

			return Utility.response(res,
				requestResponse,
				i18n.__("REQUEST_RAISED_SUCCESSFULLY"),
				httpStatus.OK,
				i18n.__("responseStatus.SUCCESS"))

		} catch (err) {
			console.log(err);
			err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
			err.resCode = i18n.__("responseStatus.ERROR");
			return next(err);
		}
	},

	//Get User List Ticket
	getUserList: async (req, res, next) => {
		try {
			const userPayload = req.user;

			const findTickets = await PGDB.pg.models.help.findAll({
				where: {
					userId: userPayload["userId"]
				}
			});

			const ticket = [];
			for (let findTicket of findTickets) {
				delete findTicket["dataValues"]["id"]
				delete findTicket["dataValues"]["zendeskId"]
				delete findTicket["dataValues"]["requesterId"]
				delete findTicket["dataValues"]["url"]

				ticket.push(findTicket["dataValues"]);
			}

			return Utility.response(res,
				ticket,
				i18n.__("USER_TICKET_RAISE_RETRIEVE_SUCCESSFULLY"),
				httpStatus.OK,
				i18n.__("responseStatus.SUCCESS"))

		} catch (err) {
			console.log(err);
			err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
			err.resCode = i18n.__("responseStatus.ERROR");
			return next(err);
		} ze
	},

	//Update Status
	zenDeskUpdate: async () => {
		const username = AppConfig.USER_NAME;
		const password = AppConfig.ZEN_PASSWORD;

		const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

		const findTickets = await PGDB.pg.models.help.findAll({});

		for (let findTicket of findTickets) {

			const res = await got.get(`${AppConfig.FIND_URL}${findTicket["dataValues"]["zendeskId"]}`, {
				responseType: 'json',
				headers: {
					'Authorization': `Basic ${token}`,
					'Cookie': `__cfruid=e5543cc72392b3fd2a7f45e4ef99b266877c240e-1629732465`,
					'Content-Type': 'application/json; charset=utf8',
				}
			});
			const ticket = JSON.parse(res["body"])
			for (let tickets of ticket["tickets"]) {

				await PGDB.pg.models.help.update({
					status: tickets["status"]
				}, {
					where: {
						id: findTicket["dataValues"]["id"]
					}
				})
			}
		}
	},
}