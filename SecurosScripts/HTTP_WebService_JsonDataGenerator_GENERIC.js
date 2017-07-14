function Init() {
    Core.RegisterEventHandler("HTTP_EVENT_PROXY", "1", "PENDING_REQUEST", "RETURN_DATA_FROM_DB");
}
function RETURN_DATA_FROM_DB(e) {
    if (e._path == "/optexGet") {

        var Cnxn = new ActiveXObject("ADODB.Connection");
        var CnxnRecord = new ActiveXObject("ADODB.Recordset");
        var Connectext = "DATABASE=optexEvents;DRIVER={PostgreSQL Unicode};PORT=5432;PWD=postgres;SERVER=127.0.0.1;UID=postgres;";
        var query = "SELECT to_timestamp(to_char(\"Report_Date\" + \"Count_StartTime\",'YYYY-MM-DD HH24:00:00'), 'YYYY-MM-DD HH24')  AS hour, (with var as (select EXTRACT(hour from \"Count_StartTime\") as thisvar) select count(\"Count_StartTime\") from events where EXTRACT(hour from \"Count_StartTime\") IN (select thisvar from var)) as count FROM events  WHERE (localtimestamp - (\"Report_Date\" + \"Count_StartTime\") < interval '24 hour') group by 2,1 order by 1";
        var respuesta = "[";
        var identificador = e._id;
        var cantidadResultados = 0;
        var count = 0;
        try {
            var lastDate = "null";
            var actualDate = "";
            Log.Debug(query);
            Cnxn.open(Connectext);
            CnxnRecord.open(query, Cnxn);
            CnxnRecord.MoveFirst;

            while (!CnxnRecord.eof) {
                actualDate = CnxnRecord.Fields.Item(0).Value;
                count = CnxnRecord.Fields.Item(1).Value;

                if (cantidadResultados > 0) {
                    respuesta += ","
                } else { cantidadResultados++; }

                respuesta += "{ \"date\" : \"" + actualDate + "\",\"visits\" : \"" + count + "\"}";

                CnxnRecord.MoveNext;

            }
            respuesta += "]";
            Log.Debug("Respuesta: " + respuesta);
            Cnxn.Close();

        }
        catch (exception) {
            Cnxn.Close();
            Log.Debug(exception);
            respuesta = "{\"Estado\":\"Incorrecto\"}";
        }

        Core.DoReact("HTTP_EVENT_PROXY", "1", "RESPONSE", "_id", identificador, "_body", respuesta, "_content_type", "text/plain");
    }
}