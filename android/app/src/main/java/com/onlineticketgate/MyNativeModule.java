package com.onlineticketgate;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;

public class MyNativeModule extends ReactContextBaseJavaModule {

    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
      
    }

    @Override
    public String getName() {
        return "MyNativeModule";
    }

    @ReactMethod
    public void myJavaMethod(String message, Promise promise) {
        // This method is called from JavaScript
        // System.out.println("Message from JavaScript: " + message);
        Log.d("MyNativeModule", "Message from JavaScript: " + message);
        String response = "Processed message: " + message;
        promise.resolve(response);
    }

}