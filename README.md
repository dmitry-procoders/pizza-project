# Pizza Delivery Service Architecture Overview

## Introduction
The architecture of the pizza delivery service is designed for scalability and modularity, addressing specific functionalities for efficient operation. It incorporates two primary components: front-end applications and a back-end API.

## Front-End Applications
Developed using the React framework, the system includes two distinct front-end applications:

- **Customer Order Application**: A user-friendly interface for customers to place orders, browse the menu, customize orders, make payments, and track delivery status.
- **Kitchen Application**: Designed for kitchen staff to manage and update the status of orders.

React's efficiency in building interactive UIs, its component-based architecture, and a wide ecosystem support rapid development and maintenance.

## Back-End API
The API, built with the NestJS framework, emphasizes scalability, TypeScript's reliability, and efficient asynchronous operation handling. It's crucial for real-time data processing in delivery services. The API's modular structure comprises several key modules:

- **Order Module**: Handles order placements, updates, and status tracking, interfacing with Pizza and Billing modules.
- **Kitchen Module**: Manages the preparation of orders, communicating with the Order module for updates.
- **Pizza Module**: Responsible for menu management, ensuring up-to-date and accurate information is displayed in the customer application.
- **Delivery Module**: Oversees the assignment of delivery personnel and tracks deliveries to ensure timely arrivals.
- **Billing Module**: Manages payment processing, including invoice generation and payment tracking.

Each module consists of controllers, services, and entities for the TypeORM database, promoting a clear separation of concerns and codebase maintainability.

## Architecture Benefits
This architecture facilitates efficient development and future expansion. Its modular approach allows for easy updates and new feature additions without disrupting existing functionalities, making it suitable for the dynamic needs of a pizza delivery service.

# State Machine Description

## Overview
The state machine describes the lifecycle of an order from receipt to completion or cancellation.

## States

- **Pending**: The initial state post-order receipt, awaiting online payment initiation.
- **Awaiting Billing**: Indicates waiting for customer payment completion if not done immediately.
- **Cancelled**: Orders move here if not paid within 30 minutes or if the customer refuses acceptance upon delivery.
- **Confirmed**: Marks the successful payment and official acceptance of the order for preparation.
- **Preparing**: The phase of making the pizza, including all preparation steps.
- **Ready for Pickup**: Indicates the pizza is ready for delivery personnel.
- **Delivery**: The order is being delivered to the customer's location.
- **Completed**: Final state upon customer acceptance, concluding the transaction successfully.

Each state represents a specific phase in the delivery process, aiding in efficient order management.
