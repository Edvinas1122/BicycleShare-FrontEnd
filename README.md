# BicycleShare-FrontEnd

Front End Server for a journaling application

## Description

A Front End of Bicycle Share application using NextJS framework.
It provides a user a web graphics interface for interacting with the service.

## Interactivity

### Authentication

Provides a method on authentication.

Current method is oAuth2 42 school.

I intend to segregate easy to interact, auth method altering. Modular change.

For not 42 school use, these strategies could be implemented:

- Authorized users database, with manual approval, with a oAuth2 provider.

oAuth2 requires the authenticating party token. Should be provided in .env file.

### Tutorial

Give the new users tutorial slides on how to use the service.

### Borrowing / Returning Process

Give users an interactive interface for leading procedural process of borrowing and returning bicycles.

### Available bicycles

Provide a visual interface on available bicycles.

Provide comments, notes on them.

Provide a way to see last few users of that bicycle with stats on use duration.

## Development

### Modularization

Modules of notion to html transcription should be segregated into a separate library.