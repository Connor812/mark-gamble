<?php

function CreateOrder($client, $customer_info, $cart)
{

    $taxAmount = 0;
    foreach ($cart as $item) {
        $order_line_item = new \Square\Models\OrderLineItem($item['quantity']);
        $order_line_item->setCatalogObjectId($item['id']);
        $line_items[] = $order_line_item;
    }


    $address = new \Square\Models\Address();
    $address->setAddressLine1($customer_info['street']);
    $address->setLocality($customer_info['city']);
    $address->setAdministrativeDistrictLevel1($customer_info['province']);
    $address->setPostalCode($customer_info['postal-code']);
    $address->setCountry($customer_info['country']);
    $address->setFirstName($customer_info['first-name']);
    $address->setLastName($customer_info['last-name']);

    $recipient = new \Square\Models\FulfillmentRecipient();
    $recipient->setDisplayName($customer_info['first-name'] . ' ' . $customer_info['last-name']);
    $recipient->setEmailAddress($customer_info['email']);
    $recipient->setPhoneNumber($customer_info['phone']);
    $recipient->setAddress($address);

    if ($customer_info['fulfillmentType'] == 'SHIPMENT') {
        $shipment_details = new \Square\Models\FulfillmentShipmentDetails();
        $shipment_details->setRecipient($recipient);

        $fulfillment = new \Square\Models\Fulfillment();
        $fulfillment->setType($customer_info['fulfillmentType']);
        $fulfillment->setShipmentDetails($shipment_details);
    } else {
        $pickup_details = new \Square\Models\FulfillmentPickupDetails();
        $pickup_details->setRecipient($recipient);
        $pickup_details->setPickupAt($customer_info['pickup-date']);

        $fulfillment = new \Square\Models\Fulfillment();
        $fulfillment->setType($customer_info['fulfillmentType']);
        $fulfillment->setPickupDetails($pickup_details);
    }

    $fulfillments = [$fulfillment];

    // # Gets Location Id
    $locationId = GetLocationId($client);
    if ($locationId['status'] == false) {
        return ([
            'status' => false,
            'error' => $locationId['error']
        ]);
    }
    $order = new \Square\Models\Order($locationId['location_id']);
    $order->setCustomerId($customer_info['customer_id']);
    $order->setLineItems($line_items);
    $order->setFulfillments($fulfillments);

    $body = new \Square\Models\CreateOrderRequest();
    $body->setOrder($order);
    $uid = uniqid();
    $body->setIdempotencyKey($uid);

    $api_response = $client->getOrdersApi()->createOrder($body);

    if ($api_response->isSuccess()) {
        $result = $api_response->getResult();
        return [
            'status' => true,
            'order' => $result->getOrder()
        ];
    } else {
        $errors = $api_response->getErrors();
        return [
            'status' => false,
            'error' => $errors
        ];
    }
}
