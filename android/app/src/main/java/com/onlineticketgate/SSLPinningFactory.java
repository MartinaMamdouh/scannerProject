package com.onlineticketgate;

import android.content.Context;
import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.cert.CertificateFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;
import android.content.res.AssetManager;
import java.util.concurrent.TimeUnit;
import java.security.cert.X509Certificate;
import android.util.Log;
import com.facebook.react.modules.network.ReactCookieJarContainer;

import okhttp3.Protocol;
import java.util.Collections;
// import com.onlineticketgate.util.Util;
// import com.onlineticketgate.protocol.Protocol;
// import javax.net.ssl.SSLSocket;
// import javax.net.ssl.SSLSocketFactory;

import java.util.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;

public class SSLPinningFactory implements OkHttpClientFactory {

    private Context context;
    private String hostname = "oldev.bibalex.org"; // Set actual hostname here
    private String pfxPassword = "123"; // Set PFX password here

    public SSLPinningFactory(Context context) {
        this.context = context;
    }

    public OkHttpClient createNewNetworkModuleClient() {
        Log.d("SSLPining", " log: " + "newNetwork");
        try {
            // Load the .pfx file from assets
            AssetManager assetManager = context.getAssets();
            InputStream inputStream = assetManager.open("DMZ_Admin.pfx");
            Log.d("SSLPining", " inputStream: " + inputStream.available());

            KeyStore keyStore = KeyStore.getInstance("PKCS12");
            Log.d("SSLPining", " keyStore: " + keyStore);
            keyStore.load(inputStream, pfxPassword.toCharArray());
            Log.d("SSLPining", " keyStore: " + keyStore.size());
            // inputStream.close();

            // Create a TrustManager that trusts the CAs in our KeyStore
            String tmfAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
            TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(tmfAlgorithm);
            trustManagerFactory.init(keyStore);
            X509TrustManager trustManager = (X509TrustManager) trustManagerFactory.getTrustManagers()[0];

            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustManagerFactory.getTrustManagers(), null);

            ReactCookieJarContainer cookieJarContainer = new ReactCookieJarContainer();

            return new OkHttpClient.Builder()
                    .connectTimeout(1, TimeUnit.SECONDS)
                    .readTimeout(1, TimeUnit.SECONDS)
                    .writeTimeout(1, TimeUnit.SECONDS)
                    .sslSocketFactory(sslContext.getSocketFactory(),trustManager)
                    .hostnameVerifier((hostname, session) -> true)
                    .authenticator((route, response) -> response.request())
                    .cookieJar(cookieJarContainer)
                    // .protocols(Protocol.HTTP_1_1)
                    // .protocols(Collections.singletonList(Protocol.HTTP_1_1))
                    // .protocols(Util.immutableList(Protocol.HTTP_1_1))
                    // .protocols(Arrays.asList(Protocol.HTTP_1_1))
                    .build();

        } catch (Exception e) {
            Log.e("SSLPinning", "Error creating OkHttpClient", e);
            throw new RuntimeException(e);
        }
    }
}


