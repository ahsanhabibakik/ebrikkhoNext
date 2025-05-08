import React, { useState } from 'react';
import { Modal, Button } from 'antd'; // Using Ant Design for simplicity
import 'antd/dist/antd.css';
import CheckoutModal from './CheckoutModal';

// File: /i:/Personal-Projects/Startup/ebrikkhoNext/src/components/shared/CheckoutModal.jsx


const CheckoutModal = ({ visible, onClose }) => {
    return (
        <Modal
            title="Checkout"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <h3>Shipping Information</h3>
                    <p>Name: John Doe</p>
                    <p>Address: 123 Main Street, City, Country</p>
                    <p>Phone: +123456789</p>
                </div>
                <div>
                    <h3>Order Summary</h3>
                    <p>Item 1: $10</p>
                    <p>Item 2: $20</p>
                    <p>Total: $30</p>
                </div>
                <div>
                    <h3>Payment Method</h3>
                    <p>Credit Card: **** **** **** 1234</p>
                </div>
                <Button type="primary" block onClick={handleConfirmOrder}>
                    Confirm Order
                </Button>
            </div>
        </Modal>
    );
};

export { CheckoutModal };

// Usage example in CartSidebar

const CartSidebar = () => {
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);

    const handleCheckout = () => {
        setShowCheckoutModal(true);
    };

    const handleOrderSuccess = () => {
        setShowCheckoutModal(false);
        window.location.href = '/checkout/success';
    };

    // Example usage of handleOrderSuccess
    const handleConfirmOrder = () => {
        handleOrderSuccess();
    };

    return (
        <div>
            <button onClick={handleCheckout}>Checkout</button>
            <CheckoutModal
                visible={showCheckoutModal}
                onClose={() => setShowCheckoutModal(false)}
            />
        </div>
    );
};

export default CartSidebar;

// Exporting CheckoutModal as a named export
export { CheckoutModal };