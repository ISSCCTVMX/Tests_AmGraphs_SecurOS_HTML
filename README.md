Tests_AmGraphs_SecurOS_HTML

Public repository for simple html form using access to a sample PostgreSQL DB using SecurOS as the main scripts engine, and AMCharts Javascript project to display charts.

This project is meant to be proven always under the SecurOS HTML Form object, since it's purpose is to be part of the system.


V1.0

This sample of the AM Charts under SecurOS uses a sample data from OPTEX counter of people.


INSTALLATION PROCESS:

1. Restore the database "optexEvents" into posgtresql with the query in the file "DB_Backup.sql"

2. Restore the table "events" into the "optexEvents" db with the query in the file "CreateTable_Events.sql"

3. Restore data for the "events" table from the "BackupEventsTable.backup" file

4. Create a SecurOS object "http_event_gate" and save the object's id

5. The script "HTTP_WebService_JsonDataGenerator_GENERIC" under the folder "SecurosScripts" query the PostgreSQL db to gather data in the proper form and can be accessed by using the "http_event_gate" object of SecurOS and the path "/optexGet".

-Please use the proper configuration on the http object's id into the script and saving the path in the SecurOS file "C:\Program Files (x86)\ISS\SecurOS\Modules\http_event_proxy\paths.txt"

6. Create an "HTML Form" object into a SecurOS desktop pointing the "index.html" file

7. Open the desktop and test





WHAT IS NOT WORKING THIS VERSION:

Of course this solution is meant to be integrated with almost any graphical solution within SecurOS, so the html script is supposed to ask for data every certain time, however exclusively that part of the script is not working into SecurOS (different from Internet Explorer), there and are no script exceptions thrown neither, so this is when I should ask the html developers for SecurOS to check where this error is taking place.


NOTES:

*** To test this away from the HTML Form object, you should open the file into Internet Explorer and accept the ActiveXObject Permissions when opening.

*** The data probably will not appear the first time, this is because the query search for the registers in the previous 24 hours. To correct this, you have to UPDATE by hand the data contained in the Backup to match at least the day before you're actually testing this.

*** To check if the HTML is correctly updating data, you could check the DEBUG console into the SecurOS JS you copied.

*** To check again if new data is being inserted into the graph, you could INSERT a new register, just remember to be very carefull specially with the columns "Report_Date" and "Count_StartTime" which are the ones that matter for this graphs.

