#instalo golang para que corra el backend
FROM golang:1.18 AS builder

RUN apt-get update

#defino mi espacio de trabajo
WORKDIR /practica1back

COPY go.mod .
COPY go.sum .
RUN go mod download

#copio todo pero el dockerignore tambien hace de las suyas
COPY . .

#RUN cd /practica1back && go build main.go

#DOCKER COMPOUSE --------------------
EXPOSE 8080

#corro el back-end
CMD ["go","run","main.go"]
