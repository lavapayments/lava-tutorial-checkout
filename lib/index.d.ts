interface CreateCheckoutSessionParams {
    checkout_mode: 'onboarding' | 'topup' | 'subscription';
    origin_url: string;
    reference_id?: string;
    connection_id?: string;
    subscription_config_id?: string;
}
interface CheckoutSessionsListParams {
    cursor?: string;
    limit?: number;
    reference_id?: string;
}
interface ConnectionsListParams {
    cursor?: string;
    limit?: number;
    reference_id?: string;
}
interface RequestsListParams {
    cursor?: string;
    limit?: number;
    connection_id?: string;
    product_id?: string;
    metadata_filters?: Record<string, string>;
}
interface CreateRequestParams {
    request_id: string;
    connection_secret: string;
    product_secret: string;
    metadata?: Record<string, string>;
    input_tokens?: number;
    output_tokens?: number;
    input_characters?: number;
    output_characters?: number;
    input_seconds?: number;
    output_seconds?: number;
}
interface RequestsListResponse {
    data: Request[];
    has_more: boolean;
    next_cursor?: string;
}
interface UsageParams {
    start: string;
    end?: string;
    connection_id?: string;
    product_id?: string;
    metadata_filters?: Record<string, string>;
}
interface ListResponse<T> {
    data: T[];
    has_more: boolean;
    next_cursor?: string;
}
interface CreateSubscriptionConfigParams {
    name: string;
    period_amount: string;
    rollover_type: 'full' | 'none';
}
interface UpdateSubscriptionConfigParams {
    name?: string;
    period_amount?: string;
    rollover_type?: 'full' | 'none';
}
type RestCheckoutSession = {
    checkout_session_id: string;
    checkout_session_token: string;
    checkout_mode: 'onboarding' | 'topup' | 'subscription';
    origin_url: string;
    connection_id?: string;
    reference_id?: string;
    subscription_config_id?: string;
    created_at: string;
    completed_at?: string;
};
type RestConnection = {
    connection_id: string;
    connection_secret: string;
    reference_id?: string;
    wallet: {
        balance: string;
        phone: string;
        email: string;
        first_name: string;
        last_name: string;
        autopay_enabled: boolean;
    };
    next_usage_reset: string;
    previous_usage_reset: string;
    created_at: string;
};
type RestRequest = {
    request_id: string;
    status: 'pending' | 'completed' | 'error';
    connection_id?: string;
    product_id?: string;
    provider: string;
    provider_key_type: 'managed' | 'unmanaged';
    model?: string;
    endpoint: string;
    response_id?: string;
    model_usage: {
        input_tokens: number;
        output_tokens: number;
        total_tokens: number;
        input_characters: number;
        output_characters: number;
        total_characters: number;
        input_seconds: number;
        output_seconds: number;
        total_seconds: number;
        input_cost: string;
        output_cost: string;
        total_cost: string;
        payer: 'wallet' | 'merchant';
    };
    fee: {
        amount: string;
        rate_type: 'fixed' | 'percentage';
        token_basis: 'input+output' | 'output';
        breakdown: {
            tier: {
                start: number;
                rate: string;
                type: 'tokens_1m' | 'characters_1m' | 'minutes' | 'requests';
            };
            tokens: number;
            characters: number;
            seconds: number;
            cost: string;
        }[];
    };
    service_charge: {
        amount: string;
        payer: 'wallet' | 'merchant';
    };
    total_request_cost: string;
    total_wallet_cost: string;
    total_merchant_cost: string;
    metadata: Record<string, string>;
    timestamp?: string;
    created_at: string;
};
type RestUsage = {
    items: {
        date: string;
        start: string;
        end: string;
        total_requests: number;
        total_usage_tokens: number;
        total_usage_cost: string;
        total_fee_amount: string;
        total_service_charge_amount: string;
        total_request_cost: string;
        total_wallet_cost: string;
        total_merchant_cost: string;
        total_gross_volume: string;
        total_net_volume: string;
    }[];
    totals: {
        total_requests: number;
        total_usage_tokens: number;
        total_usage_cost: string;
        total_fee_amount: string;
        total_service_charge_amount: string;
        total_request_cost: string;
        total_wallet_cost: string;
        total_merchant_cost: string;
        total_gross_volume: string;
        total_net_volume: string;
    };
};
type RestSubscriptionConfig = {
    subscription_config_id: string;
    merchant_id: string;
    name: string;
    period_amount: string;
    rollover_type: 'full' | 'none';
    created_at: string;
};
type RestActiveSubscription = {
    active_subscription_id: string;
    wallet_id: string;
    subscription_config_id: string;
    started_at: string;
    billing_anchor: number;
    cancelled_at?: string;
    status: 'active' | 'cancelled';
    created_at: string;
    subscription_config: RestSubscriptionConfig;
    wallet: {
        wallet_id: string;
        phone: string;
        email?: string;
        first_name?: string;
        last_name?: string;
        active_balance: string;
        created_at: string;
    };
};
/**
 * Parameters for creating a PAYG plan
 */
interface CreatePaygPlanParams {
    /** Name of the plan */
    name: string;
    /** Markup percentage (0-100) applied to base cost */
    markup_percent: number;
    /** Optional description of the plan */
    description?: string;
}
/**
 * Parameters for archiving a plan
 */
interface ArchivePlanParams {
    /** ID of the plan to archive */
    plan_id: string;
}
/**
 * REST API response for a plan's price
 */
type RestPlanPrice = {
    id: string;
    type: 'payg';
    markup_type: 'percentage' | 'fixed';
    markup_amount: string;
};
/**
 * REST API response for a plan
 */
type RestPlan = {
    id: string;
    name: string;
    status: 'active' | 'archived';
    created_at?: string;
    price: RestPlanPrice | null;
};
/**
 * Response from listing plans
 */
interface PlansListResponse {
    data: RestPlan[];
}
/**
 * Response from archiving a plan
 */
interface ArchivePlanResponse {
    id: string;
    status: 'archived';
}
/**
 * Parameters for creating a flex checkout session
 */
interface CreateFlexCheckoutSessionParams {
    /** ID of the plan for this checkout session */
    plan_id: string;
    /** Origin URL for the checkout page */
    origin_url: string;
}
/**
 * REST API response for a flex checkout session
 */
type RestFlexCheckoutSession = {
    id: string;
    url: string;
    expires_at: string;
    status: 'pending';
};
/**
 * REST API response for customer balance
 */
type CustomerBalance = {
    customer_profile_id: string;
    balance: string;
    currency: string;
    as_of: string;
};
/**
 * Parameters for listing flex customers
 */
interface CustomersListParams {
    /** Pagination cursor (customerProfileId from previous response) */
    cursor?: string;
    /** Number of results to return (default 10, max 100) */
    limit?: number;
}
/**
 * REST API response for a flex customer in list
 */
interface RestFlexCustomer {
    /** Customer profile ID */
    customer_profile_id: string;
    /** Customer email address */
    email: string | null;
    /** Customer display name */
    display_name: string | null;
    /** Plan info if customer has active subscription */
    plan: {
        id: string;
        name: string;
    } | null;
    /** ISO timestamp when customer subscribed */
    subscribed_at: string | null;
    /** Customer status (currently always 'active' for L3 customers) */
    status: 'active';
}
/**
 * Response from listing flex customers
 */
interface CustomersListResponse {
    /** Array of customer records */
    data: RestFlexCustomer[];
    /** Whether more results exist beyond this page */
    has_more: boolean;
    /** Cursor for fetching next page (present if has_more is true) */
    next_cursor?: string;
}
/**
 * Base interface for all webhook events
 */
interface WebhookEventBase {
    /** Type of the webhook event */
    type: string;
    /** ISO 8601 timestamp when the event was created */
    created_at: string;
}
/**
 * Data payload for checkout.completed event
 */
interface CheckoutCompletedEventData {
    /** Flex checkout session ID */
    checkout_session_id: string;
    /** Customer profile ID */
    customer_id: string;
    /** Customer profile secret for API requests */
    customer_secret: string;
    /** Plan ID associated with the subscription */
    plan_id: string;
    /** Flex subscription ID created for this customer */
    subscription_id: string;
    /** Amount funded to the customer's wallet (decimal string) */
    funded_amount: string;
    /** Currency code (e.g., 'USD') */
    currency: string;
}
/**
 * Webhook event emitted when a customer completes checkout
 *
 * Trigger: After successful checkout completion (wallet funded, subscription created)
 * Delivery: POST to merchant's configured webhook URL
 * Retry: 3 attempts via QStash (1min, 5min, 30min)
 *
 * Usage: Merchant receives this webhook and can immediately use `customer_secret` + `plan_id`
 * to generate L3 forward tokens for this customer.
 */
interface CheckoutCompletedEvent extends WebhookEventBase {
    /** Event type identifier */
    type: 'checkout.completed';
    /** Event-specific data payload */
    data: CheckoutCompletedEventData;
}
/**
 * Discriminated union type for all webhook events
 *
 * Use this type for type-safe webhook event handling:
 * ```typescript
 * const event: WebhookEvent = JSON.parse(payload);
 * if (event.type === 'checkout.completed') {
 *   // event is now typed as CheckoutCompletedEvent
 *   console.log(event.data.customer_id);
 * }
 * ```
 */
type WebhookEvent = CheckoutCompletedEvent;

/** biome-ignore-all lint/style/noNamespace: package uses namespace */

declare namespace Resources {
    abstract class BaseResource {
        protected lava: Lava;
        constructor(lava: Lava);
    }
    /**
     * Checkout session related endpoints
     */
    export class CheckoutSessionsResource extends BaseResource {
        /**
         * Create a checkout session
         * @param params Checkout session parameters
         * @returns Created checkout session
         */
        create(params: CreateCheckoutSessionParams): Promise<RestCheckoutSession>;
        /**
         * List checkout sessions
         * @param params List parameters
         * @returns Paginated list of checkout sessions
         */
        list(params?: CheckoutSessionsListParams): Promise<ListResponse<RestCheckoutSession>>;
        /**
         * Retrieve a checkout session
         * @param checkoutSessionId Checkout session ID
         * @returns Checkout session details
         */
        retrieve(checkoutSessionId: string): Promise<RestCheckoutSession>;
    }
    /**
     * Connection related endpoints
     */
    export class ConnectionsResource extends BaseResource {
        /**
         * List connections
         * @param params List parameters
         * @returns Paginated list of connections
         */
        list(params?: ConnectionsListParams): Promise<ListResponse<RestConnection>>;
        /**
         * Retrieve a connection
         * @param connectionId Connection ID
         * @returns Connection details
         */
        retrieve(connectionId: string): Promise<RestConnection>;
        /**
         * Delete a connection
         * @param connectionId Connection ID
         * @returns Success status
         */
        delete(connectionId: string): Promise<{
            success: boolean;
        }>;
    }
    /**
     * Request related endpoints
     */
    export class RequestsResource extends BaseResource {
        /**
         * List requests
         * @param params List parameters
         * @returns Paginated list of requests
         */
        list(params?: RequestsListParams): Promise<ListResponse<RestRequest>>;
        /**
         * Create a request
         * @param params Request parameters
         * @returns Created request details
         */
        create(params: CreateRequestParams): Promise<RestRequest>;
        /**
         * Retrieve a request
         * @param requestId Request ID
         * @returns Request details
         */
        retrieve(requestId: string): Promise<RestRequest>;
    }
    /**
     * Usage related endpoints
     */
    export class UsageResource extends BaseResource {
        /**
         * Retrieve usage statistics
         * @param params Usage parameters
         * @returns Usage data
         */
        retrieve(params: UsageParams): Promise<RestUsage>;
    }
    export class SubscriptionsResource extends BaseResource {
        /**
         * List subscription configurations
         * @returns List of subscription configurations
         */
        listConfigs(): Promise<RestSubscriptionConfig[]>;
        /**
         * Create a subscription configuration
         * @param params Subscription configuration parameters
         * @returns Created subscription configuration
         */
        createConfig(params: CreateSubscriptionConfigParams): Promise<RestSubscriptionConfig>;
        /**
         * Update a subscription configuration
         * @param id Subscription configuration ID
         * @param params Update parameters
         * @returns Updated subscription configuration
         */
        updateConfig(id: string, params: UpdateSubscriptionConfigParams): Promise<RestSubscriptionConfig>;
        /**
         * Delete a subscription configuration
         * @param id Subscription configuration ID
         * @returns Success response
         */
        deleteConfig(id: string): Promise<{
            success: boolean;
        }>;
        /**
         * List active subscriptions for a merchant
         * @returns List of active subscriptions
         */
        listActiveSubscriptions(): Promise<RestActiveSubscription[]>;
        /**
         * Cancel an active subscription
         * @param id Active subscription ID
         * @returns Success response
         */
        cancelActiveSubscription(id: string): Promise<{
            success: boolean;
        }>;
    }
    /**
     * Plans related endpoints (T028)
     */
    export class PlansResource extends BaseResource {
        /**
         * Create a PAYG plan
         * @param params Plan creation parameters
         * @returns Created plan with price details
         */
        createPayg(params: CreatePaygPlanParams): Promise<RestPlan>;
        /**
         * List all plans for the merchant
         * @returns List of plans with price details
         */
        list(): Promise<PlansListResponse>;
        /**
         * Archive a plan (plan will no longer be available for new checkout sessions)
         * @param params Archive parameters containing plan ID
         * @returns Archived plan with id and status
         */
        archive(params: ArchivePlanParams): Promise<ArchivePlanResponse>;
    }
    /**
     * Flex checkout sessions related endpoints (T029)
     */
    export class FlexCheckoutSessionsResource extends BaseResource {
        /**
         * Create a flex checkout session for a PAYG plan
         * @param params Checkout session parameters
         * @returns Created checkout session with URL and expiry
         */
        create(params: CreateFlexCheckoutSessionParams): Promise<RestFlexCheckoutSession>;
    }
    /**
     * Flex customers related endpoints (T048)
     */
    export class FlexCustomersResource extends BaseResource {
        /**
         * List customers for the merchant with cursor-based pagination
         * @param params List parameters (cursor, limit)
         * @returns Paginated list of customers with plan and subscription info
         */
        list(params?: CustomersListParams): Promise<CustomersListResponse>;
        /**
         * Get the wallet balance for a specific customer
         * @param customerProfileId Customer profile ID
         * @returns Customer balance details including balance, currency, and timestamp
         */
        getBalance(customerProfileId: string): Promise<CustomerBalance>;
    }
    /**
     * Flex resource namespace containing flex-specific sub-resources (T029)
     */
    export class FlexResource extends BaseResource {
        /**
         * Flex checkout sessions sub-resource
         */
        readonly checkoutSessions: FlexCheckoutSessionsResource;
        /**
         * Flex customers sub-resource (T048)
         */
        readonly customers: FlexCustomersResource;
        constructor(lava: Lava);
    }
    export {  };
}

type ApiVersion = '2025-04-28.v1';
interface Config {
    apiVersion: ApiVersion;
    /**
     * Base URL for the API.
     * If not provided, it will be inferred from the secret key (production or sandbox).
     */
    baseUrl?: string;
}
type ForwardTokenOptions = {
    connection_secret: string;
    product_secret: string;
    provider_key?: string;
} | {
    connection_secret: null;
    product_secret: null;
    provider_key: string;
} | {
    /** Customer profile secret for L3 forward token */
    customer_profile_secret: string;
    /** Plan ID for L3 forward token */
    plan_id: string;
};
declare class Lava {
    private readonly secretKey;
    private readonly baseUrl;
    private readonly apiVersion;
    /**
     * The checkout sessions resource
     */
    readonly checkoutSessions: Resources.CheckoutSessionsResource;
    /**
     * The connections resource
     */
    readonly connections: Resources.ConnectionsResource;
    /**
     * The requests resource
     */
    readonly requests: Resources.RequestsResource;
    /**
     * The usage resource
     */
    readonly usage: Resources.UsageResource;
    /**
     * The subscriptions resource
     */
    readonly subscriptions: Resources.SubscriptionsResource;
    /**
     * The plans resource (T028)
     */
    readonly plans: Resources.PlansResource;
    /**
     * The flex resource containing flex-specific sub-resources (T029)
     */
    readonly flex: Resources.FlexResource;
    /**
     * Provider URLs for convenience
     */
    readonly providers: {
        openai: string;
        anthropic: string;
        mistral: string;
        deepseek: string;
        xai: string;
        google: string;
        googleOpenaiCompatible: string;
        kluster: string;
        inference: string;
        groq: string;
        novita: string;
        vercel: string;
        together: string;
        hyperbolic: string;
        elevenlabs: string;
        sambanova: string;
        deepinfra: string;
        cohere: string;
        parasail: string;
        nebius: string;
        fireworks: string;
        cerebras: string;
        targon: string;
        gmicloud: string;
        chutes: string;
        baseten: string;
        moonshot: string;
    };
    /**
     * Create a new Lava client
     * @param secretKey Your Lava secret key
     * @param config Configuration options
     */
    constructor(secretKey: string, config: Config);
    /**
     * Make a request to the Lava API
     * @param method HTTP method
     * @param path API path
     * @param options Request options
     * @returns Response data
     */
    request<T>(method: string, path: string, { data, query }?: {
        data?: unknown;
        query?: Record<string, string>;
    }): Promise<T>;
    /**
     * Generate a token for the forward endpoint
     * @param options Token options - supports L0/L1/L2 (connection_secret + product_secret) or L3 (customer_profile_secret + plan_id)
     * @returns Base64 encoded token
     */
    generateForwardToken(options: ForwardTokenOptions): string;
}

/**
 * Webhook signature verification utilities
 *
 * Format: t=<timestamp>,v1=<signature>
 * Signature: HMAC-SHA256(timestamp + '.' + payload, secret)
 *
 * This provides:
 * 1. Timestamp for replay attack prevention (configurable tolerance)
 * 2. Versioned signature (v1) for future algorithm upgrades
 * 3. Stripe-compatible format for merchant familiarity
 */
/** Default tolerance for timestamp validation (5 minutes) */
declare const DEFAULT_TIMESTAMP_TOLERANCE_SECONDS = 300;
/**
 * Error thrown when webhook signature verification fails
 */
declare class WebhookSignatureVerificationError extends Error {
    constructor(message: string);
}
/**
 * Webhook signature verification result
 */
interface VerifyResult {
    /** Whether the signature is valid */
    valid: boolean;
    /** Timestamp from the signature header (only present if valid) */
    timestamp?: number;
    /** Error message if verification failed */
    error?: string;
}
/**
 * Webhook utilities for signature verification and event parsing
 */
declare class Webhooks {
    /**
     * Verify a webhook signature.
     *
     * @param params - Verification parameters
     * @param params.payload - Raw JSON string payload (must match exactly what was signed)
     * @param params.signature - The signature header value (t=...,v1=...)
     * @param params.secret - Webhook secret
     * @param params.tolerance - Max age of timestamp in seconds (default 300)
     * @returns Verification result with valid status, timestamp, and error if invalid
     *
     * @example
     * ```typescript
     * const result = Lava.Webhooks.verify({
     *   payload: req.body.toString(),
     *   signature: req.headers['x-lava-signature'],
     *   secret: process.env.LAVA_WEBHOOK_SECRET!
     * });
     *
     * if (!result.valid) {
     *   console.error('Invalid signature:', result.error);
     *   return res.status(401).json({ error: result.error });
     * }
     * ```
     */
    static verify(params: {
        payload: string;
        signature: string;
        secret: string;
        tolerance?: number;
    }): VerifyResult;
    /**
     * Construct a verified webhook event from the raw payload.
     * Throws an error if signature verification fails.
     *
     * @param payload - Raw JSON string payload
     * @param signature - The signature header value (t=...,v1=...)
     * @param secret - Webhook secret
     * @param tolerance - Max age of timestamp in seconds (default 300)
     * @returns Parsed event object
     * @throws {WebhookSignatureVerificationError} If signature verification fails
     *
     * @example
     * ```typescript
     * try {
     *   const event = Lava.Webhooks.constructEvent(
     *     req.body.toString(),
     *     req.headers['x-lava-signature'],
     *     process.env.LAVA_WEBHOOK_SECRET!
     *   );
     *   console.log('Event type:', event.type);
     * } catch (err) {
     *   console.error('Webhook verification failed:', err.message);
     *   return res.status(401).json({ error: err.message });
     * }
     * ```
     */
    static constructEvent(payload: string, signature: string, secret: string, tolerance?: number): unknown;
}

export { type ApiVersion, type ArchivePlanParams, type ArchivePlanResponse, type CheckoutCompletedEvent, type CheckoutCompletedEventData, type CheckoutSessionsListParams, type Config, type ConnectionsListParams, type CreateCheckoutSessionParams, type CreateFlexCheckoutSessionParams, type CreatePaygPlanParams, type CreateRequestParams, type CreateSubscriptionConfigParams, type CustomerBalance, type CustomersListParams, type CustomersListResponse, DEFAULT_TIMESTAMP_TOLERANCE_SECONDS, type ForwardTokenOptions, Lava, type ListResponse, type PlansListResponse, type RequestsListParams, type RequestsListResponse, Resources, type RestActiveSubscription, type RestCheckoutSession, type RestConnection, type RestFlexCheckoutSession, type RestFlexCustomer, type RestPlan, type RestPlanPrice, type RestRequest, type RestSubscriptionConfig, type RestUsage, type UpdateSubscriptionConfigParams, type UsageParams, type VerifyResult, type WebhookEvent, type WebhookEventBase, WebhookSignatureVerificationError, Webhooks };
