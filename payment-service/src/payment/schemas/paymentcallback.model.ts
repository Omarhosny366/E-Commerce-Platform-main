import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface representing a document in MongoDB
interface IPaymentDetails extends Document {
    amount_cents: number;
    created_at: string;
    currency: string;
    error_occured: boolean;
    has_parent_transaction: boolean;
    id: number;
    integration_id: number;
    is_3d_secure: boolean;
    is_auth: boolean;
    is_capture: boolean;
    is_refunded: boolean;
    is_standalone_payment: boolean;
    is_voided: boolean;
    order_id: number;
    owner: string;
    pending: boolean;
    source_data_pan: string;
    source_data_sub_type: string;
    source_data_type: string;
    success: boolean;
}

// Create a schema corresponding to the document interface
const paymentDetailsSchema: Schema<IPaymentDetails> = new Schema({
    amount_cents: {
        type: Number,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    error_occured: {
        type: Boolean,
        required: true
    },
    has_parent_transaction: {
        type: Boolean,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    integration_id: {
        type: Number,
        required: true
    },
    is_3d_secure: {
        type: Boolean,
        required: true
    },
    is_auth: {
        type: Boolean,
        required: true
    },
    is_capture: {
        type: Boolean,
        required: true
    },
    is_refunded: {
        type: Boolean,
        required: true
    },
    is_standalone_payment: {
        type: Boolean,
        required: true
    },
    is_voided: {
        type: Boolean,
        required: true
    },
    order_id: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    pending: {
        type: Boolean,
        required: true
    },
    source_data_pan: {
        type: String,
        required: true
    },
    source_data_sub_type: {
        type: String,
        required: true
    },
    source_data_type: {
        type: String,
        required: true
    },
    success: {
        type: Boolean,
        required: true
    }
});

// Create a model based on the schema
const PaymentDetails: Model<IPaymentDetails> = mongoose.model<IPaymentDetails>('PaymentDetails', paymentDetailsSchema);

export default PaymentDetails;
