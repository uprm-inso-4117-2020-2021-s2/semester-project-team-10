package computerdatabase

import scala.concurrent.duration._
import io.gatling.core.Predef._
import io.gatling.core.session
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class MoodySimulation extends Simulation {

	val httpProtocol = http
		.baseUrl("http://127.0.0.1:8000")

	// USERS //
	object CreateUser {
		val userFeeder = jsonFile("data/users.json").queue

		val createUser = feed(userFeeder).exec(http("Create_User")
			.post("/users")
			.header("Content-Type", "application/json")
			.header("Accept", "application/json")
				.body(StringBody("""{ "email": "${email}",
													  				 "username": "${username}",
													  				 "password": "${password}" }""")).asJson
		)
	}

	object LogIn {
		val userFeeder = jsonFile("data/users.json").queue

		val logIn = feed(userFeeder).exec(http("Log_In")
			.post("/token")
			.header("Content-Type", "application/x-www-form-urlencoded")
			.formParamSeq(Seq(("username", "${username}"), ("password", "${password}")))
		)
	}

	// JOURNAL ENTRIES //

	object CreateEntry {
		val userFeeder = jsonFile("data/users.json").random
		val entriesFeeder = jsonFile("data/entries.json").random

		val createEntry = feed(userFeeder).exec(http("Log_In")
			.post("/token")
			.header("Content-Type", "application/x-www-form-urlencoded")
			.formParamSeq(Seq(("username", "${username}"), ("password", "${password}")))
		.check(jsonPath("$.access_token").saveAs("access_token")))
			.exec {
				session => {
					session.set("access_token", "${access_token}")
					println("Token " + session("access_token").as[String])
					session
				}
			}
			.feed(entriesFeeder).exec(http("Create_Entry")
			.post("/journal-entry/new")
			.header("Content-Type", "application/json")
			.header("Accept", "application/json")
			.header("Authorization", "Bearer ${access_token}")
			.body(RawFileBody("${path}")).asJson
			)
	}

	object UpdateEntry {

	}

	object SearchEntry {

	}

	// val usersRegister = scenario("Register and Log In").exec(CreateUser.createUser, LogIn.logIn)
	val entries = scenario("Log in and Create Entry").exec(CreateEntry.createEntry)

	setUp(entries.inject(rampUsers(20) during(20))).protocols(httpProtocol)
}