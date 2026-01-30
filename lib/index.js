"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DEFAULT_TIMESTAMP_TOLERANCE_SECONDS: () => DEFAULT_TIMESTAMP_TOLERANCE_SECONDS,
  Lava: () => Lava,
  Resources: () => Resources,
  WebhookSignatureVerificationError: () => WebhookSignatureVerificationError,
  Webhooks: () => Webhooks
});
module.exports = __toCommonJS(index_exports);

// src/resources.ts
var Resources;
((Resources2) => {
  class BaseResource {
    constructor(lava) {
      this.lava = lava;
    }
  }
  class CheckoutSessionsResource extends BaseResource {
    /**
     * Create a checkout session
     * @param params Checkout session parameters
     * @returns Created checkout session
     */
    create(params) {
      return this.lava.request(
        "POST",
        "checkout_sessions",
        {
          data: params
        }
      );
    }
    /**
     * List checkout sessions
     * @param params List parameters
     * @returns Paginated list of checkout sessions
     */
    list(params) {
      const queryParams = {};
      if (params) {
        if (params.cursor) {
          queryParams.cursor = params.cursor;
        }
        if (params.limit) {
          queryParams.limit = params.limit.toString();
        }
        if (params.reference_id) {
          queryParams.reference_id = params.reference_id;
        }
      }
      return this.lava.request(
        "GET",
        "checkout_sessions",
        {
          query: queryParams
        }
      );
    }
    /**
     * Retrieve a checkout session
     * @param checkoutSessionId Checkout session ID
     * @returns Checkout session details
     */
    retrieve(checkoutSessionId) {
      return this.lava.request(
        "GET",
        `checkout_sessions/${checkoutSessionId}`
      );
    }
  }
  Resources2.CheckoutSessionsResource = CheckoutSessionsResource;
  class ConnectionsResource extends BaseResource {
    /**
     * List connections
     * @param params List parameters
     * @returns Paginated list of connections
     */
    list(params) {
      const queryParams = {};
      if (params) {
        if (params.cursor) {
          queryParams.cursor = params.cursor;
        }
        if (params.limit) {
          queryParams.limit = params.limit.toString();
        }
        if (params.reference_id) {
          queryParams.reference_id = params.reference_id;
        }
      }
      return this.lava.request(
        "GET",
        "connections",
        {
          query: queryParams
        }
      );
    }
    /**
     * Retrieve a connection
     * @param connectionId Connection ID
     * @returns Connection details
     */
    retrieve(connectionId) {
      return this.lava.request(
        "GET",
        `connections/${connectionId}`
      );
    }
    /**
     * Delete a connection
     * @param connectionId Connection ID
     * @returns Success status
     */
    delete(connectionId) {
      return this.lava.request(
        "DELETE",
        `connections/${connectionId}`
      );
    }
  }
  Resources2.ConnectionsResource = ConnectionsResource;
  class RequestsResource extends BaseResource {
    /**
     * List requests
     * @param params List parameters
     * @returns Paginated list of requests
     */
    list(params) {
      const queryParams = {};
      if (params) {
        if (params.cursor) {
          queryParams.cursor = params.cursor;
        }
        if (params.limit) {
          queryParams.limit = params.limit.toString();
        }
        if (params.connection_id) {
          queryParams.connection_id = params.connection_id;
        }
        if (params.product_id) {
          queryParams.product_id = params.product_id;
        }
        if (params.metadata_filters) {
          queryParams.metadata_filters = JSON.stringify(
            Object.entries(params.metadata_filters)
          );
        }
      }
      return this.lava.request("GET", "requests", {
        query: queryParams
      });
    }
    /**
     * Create a request
     * @param params Request parameters
     * @returns Created request details
     */
    create(params) {
      return this.lava.request("POST", "requests", {
        data: params
      });
    }
    /**
     * Retrieve a request
     * @param requestId Request ID
     * @returns Request details
     */
    retrieve(requestId) {
      return this.lava.request("GET", `requests/${requestId}`);
    }
  }
  Resources2.RequestsResource = RequestsResource;
  class UsageResource extends BaseResource {
    /**
     * Retrieve usage statistics
     * @param params Usage parameters
     * @returns Usage data
     */
    retrieve(params) {
      const queryParams = {
        start: params.start
      };
      if (params.end) {
        queryParams.end = params.end;
      }
      if (params.connection_id) {
        queryParams.connection_id = params.connection_id;
      }
      if (params.product_id) {
        queryParams.product_id = params.product_id;
      }
      if (params.metadata_filters) {
        queryParams.metadata_filters = JSON.stringify(
          Object.entries(params.metadata_filters)
        );
      }
      return this.lava.request("GET", "usage", {
        query: queryParams
      });
    }
  }
  Resources2.UsageResource = UsageResource;
  class SubscriptionsResource extends BaseResource {
    /**
     * List subscription configurations
     * @returns List of subscription configurations
     */
    listConfigs() {
      return this.lava.request(
        "GET",
        "subscription-configs"
      );
    }
    /**
     * Create a subscription configuration
     * @param params Subscription configuration parameters
     * @returns Created subscription configuration
     */
    createConfig(params) {
      return this.lava.request(
        "POST",
        "subscription-configs",
        {
          data: params
        }
      );
    }
    /**
     * Update a subscription configuration
     * @param id Subscription configuration ID
     * @param params Update parameters
     * @returns Updated subscription configuration
     */
    updateConfig(id, params) {
      return this.lava.request(
        "PUT",
        `subscription-configs/${id}`,
        {
          data: params
        }
      );
    }
    /**
     * Delete a subscription configuration
     * @param id Subscription configuration ID
     * @returns Success response
     */
    deleteConfig(id) {
      return this.lava.request(
        "DELETE",
        `subscription-configs/${id}`
      );
    }
    /**
     * List active subscriptions for a merchant
     * @returns List of active subscriptions
     */
    listActiveSubscriptions() {
      return this.lava.request(
        "GET",
        "active-subscriptions"
      );
    }
    /**
     * Cancel an active subscription
     * @param id Active subscription ID
     * @returns Success response
     */
    cancelActiveSubscription(id) {
      return this.lava.request(
        "DELETE",
        `active-subscriptions/${id}`
      );
    }
  }
  Resources2.SubscriptionsResource = SubscriptionsResource;
  class PlansResource extends BaseResource {
    /**
     * Create a PAYG plan
     * @param params Plan creation parameters
     * @returns Created plan with price details
     */
    createPayg(params) {
      return this.lava.request("POST", "plans", {
        data: {
          name: params.name,
          markup_percent: params.markup_percent,
          description: params.description
        }
      });
    }
    /**
     * List all plans for the merchant
     * @returns List of plans with price details
     */
    list() {
      return this.lava.request("GET", "plans");
    }
    /**
     * Archive a plan (plan will no longer be available for new checkout sessions)
     * @param params Archive parameters containing plan ID
     * @returns Archived plan with id and status
     */
    archive(params) {
      return this.lava.request(
        "POST",
        `plans/${params.plan_id}/archive`
      );
    }
  }
  Resources2.PlansResource = PlansResource;
  class FlexCheckoutSessionsResource extends BaseResource {
    /**
     * Create a flex checkout session for a PAYG plan
     * @param params Checkout session parameters
     * @returns Created checkout session with URL and expiry
     */
    create(params) {
      return this.lava.request(
        "POST",
        "flex/checkout_sessions",
        {
          data: {
            plan_id: params.plan_id,
            origin_url: params.origin_url
          }
        }
      );
    }
  }
  Resources2.FlexCheckoutSessionsResource = FlexCheckoutSessionsResource;
  class FlexCustomersResource extends BaseResource {
    /**
     * List customers for the merchant with cursor-based pagination
     * @param params List parameters (cursor, limit)
     * @returns Paginated list of customers with plan and subscription info
     */
    list(params) {
      const queryParams = {};
      if (params?.cursor) {
        queryParams.cursor = params.cursor;
      }
      if (params?.limit !== void 0) {
        queryParams.limit = params.limit.toString();
      }
      return this.lava.request("GET", "flex/customers", {
        query: queryParams
      });
    }
    /**
     * Get the wallet balance for a specific customer
     * @param customerProfileId Customer profile ID
     * @returns Customer balance details including balance, currency, and timestamp
     */
    getBalance(customerProfileId) {
      return this.lava.request(
        "GET",
        `flex/customers/${customerProfileId}/balance`
      );
    }
  }
  Resources2.FlexCustomersResource = FlexCustomersResource;
  class FlexResource extends BaseResource {
    constructor(lava) {
      super(lava);
      this.checkoutSessions = new FlexCheckoutSessionsResource(lava);
      this.customers = new FlexCustomersResource(lava);
    }
  }
  Resources2.FlexResource = FlexResource;
})(Resources || (Resources = {}));

// src/client.ts
var Lava = class {
  /**
   * Create a new Lava client
   * @param secretKey Your Lava secret key
   * @param config Configuration options
   */
  constructor(secretKey, config) {
    this.secretKey = secretKey;
    this.apiVersion = config.apiVersion;
    const isTestMode = secretKey.startsWith("aks_test_");
    this.baseUrl = config.baseUrl || (isTestMode ? "https://sandbox-api.lavapayments.com/v1/" : "https://api.lavapayments.com/v1/");
    this.checkoutSessions = new Resources.CheckoutSessionsResource(this);
    this.connections = new Resources.ConnectionsResource(this);
    this.requests = new Resources.RequestsResource(this);
    this.usage = new Resources.UsageResource(this);
    this.subscriptions = new Resources.SubscriptionsResource(this);
    this.plans = new Resources.PlansResource(this);
    this.flex = new Resources.FlexResource(this);
    this.providers = {
      openai: `${this.baseUrl}forward?u=https://api.openai.com/v1`,
      anthropic: `${this.baseUrl}forward?u=https://api.anthropic.com/v1`,
      mistral: `${this.baseUrl}forward?u=https://api.mistral.ai/v1`,
      deepseek: `${this.baseUrl}forward?u=https://api.deepseek.com/v1`,
      xai: `${this.baseUrl}forward?u=https://api.x.ai/v1`,
      google: `${this.baseUrl}forward?u=https://generativelanguage.googleapis.com/v1beta`,
      googleOpenaiCompatible: `${this.baseUrl}forward?u=https://generativelanguage.googleapis.com/v1beta/openai`,
      kluster: `${this.baseUrl}forward?u=https://api.kluster.ai/v1`,
      inference: `${this.baseUrl}forward?u=https://api.inference.net/v1`,
      groq: `${this.baseUrl}forward?u=https://api.groq.com/openai/v1`,
      novita: `${this.baseUrl}forward?u=https://api.novita.ai/v3/openai`,
      vercel: `${this.baseUrl}forward?u=https://api.v0.dev/v1`,
      together: `${this.baseUrl}forward?u=https://api.together.xyz/v1`,
      hyperbolic: `${this.baseUrl}forward?u=https://api.hyperbolic.xyz/v1`,
      elevenlabs: `${this.baseUrl}forward?u=https://api.elevenlabs.io/v1`,
      sambanova: `${this.baseUrl}forward?u=https://api.sambanova.ai/v1`,
      deepinfra: `${this.baseUrl}forward?u=https://api.deepinfra.com/v1/openai`,
      cohere: `${this.baseUrl}forward?u=https://api.cohere.ai/compatibility/v1`,
      parasail: `${this.baseUrl}forward?u=https://api.parasail.io/v1`,
      nebius: `${this.baseUrl}forward?u=https://api.studio.nebius.com/v1`,
      fireworks: `${this.baseUrl}forward?u=https://api.fireworks.ai/inference/v1`,
      cerebras: `${this.baseUrl}forward?u=https://api.cerebras.ai/v1`,
      targon: `${this.baseUrl}forward?u=https://api.targon.com/v1`,
      gmicloud: `${this.baseUrl}forward?u=https://api.gmi-serving.com/v1`,
      chutes: `${this.baseUrl}forward?u=https://llm.chutes.ai/v1`,
      baseten: `${this.baseUrl}forward?u=https://inference.baseten.co/v1`,
      moonshot: `${this.baseUrl}forward?u=https://api.moonshot.ai/v1`
    };
  }
  /**
   * Make a request to the Lava API
   * @param method HTTP method
   * @param path API path
   * @param options Request options
   * @returns Response data
   */
  async request(method, path, { data, query } = {}) {
    const url = new URL(path, this.baseUrl);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== void 0) {
          url.searchParams.append(key, value.toString());
        }
      }
    }
    const headers = {
      Authorization: `Bearer ${this.secretKey}`,
      "Content-Type": "application/json",
      "X-Lava-API-Version": this.apiVersion
    };
    const requestOptions = {
      method,
      headers,
      body: data ? JSON.stringify(data) : void 0
    };
    const response = await fetch(url.toString(), requestOptions);
    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      const errorMessage = typeof errorJson.error === "object" ? JSON.stringify(errorJson.error) : errorJson.error || "Unknown error";
      throw new Error(
        `Lava API Error: ${response.status} ${response.statusText} - ${errorMessage}`
      );
    }
    return response.json();
  }
  /**
   * Generate a token for the forward endpoint
   * @param options Token options - supports L0/L1/L2 (connection_secret + product_secret) or L3 (customer_profile_secret + plan_id)
   * @returns Base64 encoded token
   */
  generateForwardToken(options) {
    if ("customer_profile_secret" in options && "plan_id" in options) {
      const tokenData2 = {
        secret_key: this.secretKey,
        customer_profile_secret: options.customer_profile_secret,
        plan_id: options.plan_id
      };
      return Buffer.from(JSON.stringify(tokenData2)).toString("base64");
    }
    const tokenData = {
      secret_key: this.secretKey,
      connection_secret: options.connection_secret,
      product_secret: options.product_secret,
      provider_key: "provider_key" in options ? options.provider_key : void 0
    };
    return Buffer.from(JSON.stringify(tokenData)).toString("base64");
  }
};

// src/webhooks.ts
var import_crypto = require("crypto");
var DEFAULT_TIMESTAMP_TOLERANCE_SECONDS = 300;
var WebhookSignatureVerificationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "WebhookSignatureVerificationError";
  }
};
var createSignedPayload = (timestamp, payload) => {
  return `${timestamp}.${payload}`;
};
var generateHmacSignature = (signedPayload, secret) => {
  return (0, import_crypto.createHmac)("sha256", secret).update(signedPayload).digest("hex");
};
var timingSafeEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  return (0, import_crypto.timingSafeEqual)(Buffer.from(a), Buffer.from(b));
};
var parseSignatureHeader = (header) => {
  if (!header || typeof header !== "string") {
    return null;
  }
  const parts = header.split(",").map((part) => part.trim());
  let timestamp = null;
  const signatures = [];
  for (const part of parts) {
    const [key, value] = part.split("=");
    if (!(key && value)) {
      continue;
    }
    if (key === "t") {
      const parsed = Number.parseInt(value, 10);
      if (Number.isNaN(parsed)) {
        return null;
      }
      timestamp = parsed;
    } else if (key === "v1") {
      signatures.push(value);
    }
  }
  if (timestamp === null || signatures.length === 0) {
    return null;
  }
  return { timestamp, signatures };
};
var Webhooks = class {
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
  static verify(params) {
    const { payload, signature, secret, tolerance = DEFAULT_TIMESTAMP_TOLERANCE_SECONDS } = params;
    const parsed = parseSignatureHeader(signature);
    if (!parsed) {
      return { valid: false, error: "Invalid signature format" };
    }
    const { timestamp, signatures } = parsed;
    const currentTimestamp = Math.floor(Date.now() / 1e3);
    const diff = currentTimestamp - timestamp;
    if (diff > tolerance) {
      return { valid: false, error: "Timestamp too old" };
    }
    if (diff < -tolerance) {
      return { valid: false, error: "Timestamp too new" };
    }
    const signedPayload = createSignedPayload(timestamp, payload);
    const expectedSignature = generateHmacSignature(signedPayload, secret);
    const isValid = signatures.some((sig) => timingSafeEqual(sig, expectedSignature));
    if (!isValid) {
      return { valid: false, error: "Signature mismatch" };
    }
    return { valid: true, timestamp };
  }
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
  static constructEvent(payload, signature, secret, tolerance) {
    const result = this.verify({ payload, signature, secret, tolerance });
    if (!result.valid) {
      throw new WebhookSignatureVerificationError(
        result.error || "Webhook signature verification failed"
      );
    }
    try {
      return JSON.parse(payload);
    } catch (err) {
      throw new WebhookSignatureVerificationError(
        `Invalid JSON payload: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_TIMESTAMP_TOLERANCE_SECONDS,
  Lava,
  Resources,
  WebhookSignatureVerificationError,
  Webhooks
});
