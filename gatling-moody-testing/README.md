gatling-moody-testing
=========================

To run the project. Import the project into IntelliJ IDE by selecting the pom.xml file in the Open File or Project window. This will set up the project with maven in the IDE.
To test it out, simply execute the Engine.scala object in the src>scala project directoy. The results of the simulation are stored in the target>gatling directory.
The MoodySimulation.scala class contains the different scenarios to test.

Make sure that the uvicorn server database is running with the following credentials. You can verify this in the database.py script.

  > db_url='localhost' \n
  > db_name='moody_testing' \n
  > db_username='moody' \n
  > db_password='moodypass' \n

