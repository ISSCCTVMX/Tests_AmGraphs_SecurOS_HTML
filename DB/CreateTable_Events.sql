-- Table: events

-- DROP TABLE events;

CREATE TABLE events
(
  id serial NOT NULL,
  "Metrics_SiteId" text,
  "Metrics_SiteName" text,
  "Metrics_DeviceId" text,
  "Metrics_DeviceName" text,
  "Version" text,
  "SensorTime" timestamp without time zone,
  "MacAddress" text,
  "IpAddress" text,
  "HostName" text,
  "HwPlatform" text,
  "Timezone" text,
  "IANA" text,
  "Dst" text,
  "DeviceType" text,
  "SerialNumber" text,
  "BootTime" timestamp without time zone,
  "ReportData_Interval" text,
  "Report_Date" date,
  "Count_Id" text,
  "Count_Enters" text,
  "Count_Exits" text,
  "Count_Status" text,
  "Count_StartTime" time without time zone,
  "Count_EndTime" time without time zone,
  CONSTRAINT events_pkey PRIMARY KEY (id )
)
WITH (
  OIDS=FALSE
);
ALTER TABLE events
  OWNER TO postgres;
