# Spark Application

The Apache Spark structured streaming application exists to consume the smartwatch data produced to the Kafka cluster produce classifications from it.

The applcation takes the following steps to achieve this:

1. Consume data from "watch" Kafka topic
2. Window user-grouped data into desired session frame length
3. Classify session frame into one of 7 supported exercises
4. Produce classification data to "classification" Kafka topic
