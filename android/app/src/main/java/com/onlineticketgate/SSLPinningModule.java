
package com.onlineticketgate;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.network.OkHttpClientFactory;
import okhttp3.OkHttpClient;

public class SSLPinningModule extends ReactContextBaseJavaModule {

    private static OkHttpClient customClient;

    public SSLPinningModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SSLPinningModule";
    }

    @ReactMethod
    public void createNewNetworkClient(Promise promise) {
        try {
            SSLPinningFactory factory = new SSLPinningFactory(getReactApplicationContext());
            customClient = factory.createNewNetworkModuleClient();
            promise.resolve("OkHttpClient created successfully");
        } catch (Exception e) {
            promise.reject("Error creating OkHttpClient", e);
        }
    }

    public static OkHttpClient getCustomClient() {
        return customClient;
    }
}
