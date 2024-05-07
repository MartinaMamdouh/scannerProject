package com.onlineticketgate;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;

import android.os.Bundle;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.view.Menu;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import com.onlineticketgate.R;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ScannerModule extends ReactContextBaseJavaModule 
{
	public EditText mResultText;
	public String mStatusText;
	public TextView mSuccessFailText;
	public ProgressDialog mProgressDialog;
	public EditText mParamEdit1;
	public EditText mParamEdit2;
	public EditText mParamEdit3;
	public Button mOpenButton;
	public Spinner mParamSpinner1;
	public Spinner mParamSpinner2;
	public String mCurrentStatus;
	public String mSavedStatus;
	public boolean mIsRegisterReceiver;

	public static final String STATUS_CLOSE = "STATUS_CLOSE";
	public static final String STATUS_OPEN = "STATUS_OPEN";
	public static final String STATUS_TRIGGER_ON = "STATUS_TRIGGER_ON";

	public static final int SEQ_BARCODE_OPEN = 100;
	public static final int SEQ_BARCODE_CLOSE = 200;
	public static final int SEQ_BARCODE_GET_STATUS = 300;
	public static final int SEQ_BARCODE_SET_TRIGGER_ON = 400;
	public static final int SEQ_BARCODE_SET_TRIGGER_OFF = 500;
	public static final int SEQ_BARCODE_SET_PARAMETER = 600;
	public static final int SEQ_BARCODE_GET_PARAMETER = 700;
    public int mSelectedSetParam = -1;
	public int mSelectedGetParam = -1;

    public ScannerModule(ReactApplicationContext reactContext) {
        super(reactContext);
      	mIsRegisterReceiver = false;
    }

    @Override
    public String getName() {
        return "ScannerModule";
    }


    @ReactMethod
    public void getLastScannedData() {
        // promise.resolve(mResultText.getText().toString());
		Log.d("ScannerModule", " getLastScannedData fn " + mIsRegisterReceiver);
    }

	@ReactMethod
	public void registerReceiver()  //start trigger to scan code 
	{
		Log.d("ScannerModule", "register fn");
		if(mIsRegisterReceiver) return;
		IntentFilter filter = new IntentFilter();
		filter.addAction(Constants.ACTION_BARCODE_CALLBACK_DECODING_DATA);
		// Log.d("ScannerModule", "DECODING_DATA "+Constants.ACTION_BARCODE_CALLBACK_DECODING_DATA);
		filter.addAction(Constants.ACTION_BARCODE_CALLBACK_REQUEST_SUCCESS);
		// Log.d("ScannerModule", "REQUEST_SUCCESS "+ Constants.ACTION_BARCODE_CALLBACK_REQUEST_SUCCESS);
		filter.addAction(Constants.ACTION_BARCODE_CALLBACK_REQUEST_FAILED);
		// Log.d("ScannerModule", "REQUEST_FAILED "+Constants.ACTION_BARCODE_CALLBACK_REQUEST_FAILED);
		filter.addAction(Constants.ACTION_BARCODE_CALLBACK_PARAMETER);
		// Log.d("ScannerModule", "PARAMETER "+Constants.ACTION_BARCODE_CALLBACK_PARAMETER);
		filter.addAction(Constants.ACTION_BARCODE_CALLBACK_GET_STATUS);
		// Log.d("ScannerModule", "GET_STATUS "+Constants.ACTION_BARCODE_CALLBACK_GET_STATUS);

		// Obtain the ReactApplicationContext and cast it to Context
		Context context = getReactApplicationContext();

		// Use the context to register the receiver
		context.registerReceiver(mReceiver, filter);

		mIsRegisterReceiver = true;
	}

	@ReactMethod
	public void unregisterReceiver()  //stop trigger to scan code 
	{
		Log.d("ScannerModule", " unregister fn");
		if(!mIsRegisterReceiver) return;
		 // Obtain the ReactApplicationContext and cast it to Context
		Context context = getReactApplicationContext();

		// Use the context to unregister the receiver
		context.unregisterReceiver(mReceiver);
		mIsRegisterReceiver = false;
	}

	public int mBarcodeHandle = -1;
	public int mCount = 0;
	public String[] STATUS_ARR = {STATUS_CLOSE, STATUS_OPEN, STATUS_TRIGGER_ON};

	public BroadcastReceiver mReceiver = new BroadcastReceiver()
	{
		@Override
		public void onReceive(Context context, Intent intent) {  //onscan 
			Log.d("ScannerModule", "hello reader ");
			String action = intent.getAction();
			int handle = intent.getIntExtra(Constants.EXTRA_HANDLE, 0);
			int seq = intent.getIntExtra(Constants.EXTRA_INT_DATA3, 0);
			if(action.equals(Constants.ACTION_BARCODE_CALLBACK_DECODING_DATA))
			{
				Log.d("ScannerModule", "if DECODING_DATA ");
				mCount++;
				byte[] data = intent.getByteArrayExtra(Constants.EXTRA_BARCODE_DECODING_DATA);
				int symbology = intent.getIntExtra(Constants.EXTRA_INT_DATA2, -1);
				String result = "[BarcodeDecodingData handle : "+handle+" / count : "+mCount+" / seq : "+seq+"]\n";
				result += ("[Symbology] : " + symbology + "\n");
				String dataResult = "";
				if(data!=null) 
				{
					dataResult = new String(data);
					if(dataResult.contains("�"))
					{
						try {
							dataResult = new String(data, "Shift-JIS");
						} catch (UnsupportedEncodingException e) {							
							e.printStackTrace();
						}
					}
				}		
				result += "[Data] : "+dataResult;
                Log.d("ScannerModule", "scan from reader: " + result);
				// setResultText(result);
				Log.d("ScannerModule", "dataResult "+ dataResult);
			
				//Emit an event to JavaScript
				 getReactApplicationContext()
				 .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
				 .emit("onBarcodeDataReceived", dataResult);


			}
			else if(action.equals(Constants.ACTION_BARCODE_CALLBACK_REQUEST_SUCCESS))
			{
				Log.d("ScannerModule", "if CALLBACK_REQUEST_SUCCESS "+seq);
				// setSuccessFailText("Success : "+seq);
				// if(seq == SEQ_BARCODE_OPEN) 
				// {
				// 	mBarcodeHandle = intent.getIntExtra(Constants.EXTRA_HANDLE, 0);
				// 	mCurrentStatus = STATUS_OPEN;
				// 	// showProgressDialog(false);
				// }
				// else if(seq == SEQ_BARCODE_CLOSE) 
				// {
				// 	mCurrentStatus = STATUS_CLOSE;
				// 	// showProgressDialog(false);
				// }
				// else if(seq == SEQ_BARCODE_GET_STATUS)
				// {
				// 	mCurrentStatus = STATUS_CLOSE;
				// 	// showProgressDialog(false);
				// }
				// else if(seq == SEQ_BARCODE_SET_TRIGGER_ON) mCurrentStatus = STATUS_TRIGGER_ON;
				// else if(seq == SEQ_BARCODE_SET_TRIGGER_OFF) mCurrentStatus = STATUS_OPEN;
				// else if(seq == SEQ_BARCODE_SET_PARAMETER)
				// {
				// 	setResultText("SET_PARAMETER success");
				// }
				// else 
				// {
				// 	// showProgressDialog(false);
				// }

				// refreshCurrentStatus();
				// refreshButton();
			}
			else if(action.equals(Constants.ACTION_BARCODE_CALLBACK_REQUEST_FAILED))
			{
				Log.d("ScannerModule", "if CALLBACK_REQUEST_FAILED ");
				// int result = intent.getIntExtra(Constants.EXTRA_INT_DATA2, 0);
				// // showProgressDialog(false);
				// if(result == Constants.ERROR_BARCODE_DECODING_TIMEOUT) 
				// {
				// 	setSuccessFailText("Failed result : "+"Decode Timeout"+" / seq : "+seq);
				// }
				// else if(result == Constants.ERROR_NOT_SUPPORTED) 
				// {
				// 	setSuccessFailText("Failed result : "+"Not Supoorted"+" / seq : "+seq);
				// }
				// else if(result == Constants.ERROR_BARCODE_ERROR_USE_TIMEOUT) 
				// {
				// 	mCurrentStatus = STATUS_CLOSE;
				// 	setSuccessFailText("Failed result : "+"Use Timeout"+" / seq : "+seq);
				// }
				// else if(result == Constants.ERROR_BARCODE_ERROR_ALREADY_OPENED) 
				// {
				// 	mCurrentStatus = STATUS_OPEN;
				// 	setSuccessFailText("Failed result : "+"Already opened"+" / seq : "+seq);
				// }
				// else if(result == Constants.ERROR_BATTERY_LOW) 
				// {
				// 	mCurrentStatus = STATUS_CLOSE;
				// 	setSuccessFailText("Failed result : "+"Battery low"+" / seq : "+seq);
				// }
				// else if(result == Constants.ERROR_NO_RESPONSE)
				// {
				// 	int notiCode = intent.getIntExtra(Constants.EXTRA_INT_DATA3, 0);
				// 	setSuccessFailText("Failed result : "+ notiCode+"/ ### ERROR_NO_RESPONSE ###");
				// 	mCurrentStatus = STATUS_CLOSE;
				// 	setSuccessFailText("Failed result : "+result+" / seq : "+seq);
				// }
				// else 
				// {
				// 	setSuccessFailText("Failed result : "+result+" / seq : "+seq);
				// }
				// if(seq == SEQ_BARCODE_SET_PARAMETER)
				// {
				// 	if(result == Constants.ERROR_BARCODE_EXCEED_ASCII_CODE) setResultText("SET_PARAMETER failed:exceed range of ascii code"); 
				// }
				// refreshCurrentStatus();
				// refreshButton();
			}
			else if(action.equals(Constants.ACTION_BARCODE_CALLBACK_PARAMETER))
			{
				Log.d("ScannerModule", "if CALLBACK_PARAMETER ");
				// int parameter = intent.getIntExtra(Constants.EXTRA_INT_DATA2, -1);
				// String value = intent.getStringExtra(Constants.EXTRA_STR_DATA1);

				// setResultText("Get parameter result\nparameter : "+parameter+" / value : "+value);
			}
			else if(action.equals(Constants.ACTION_BARCODE_CALLBACK_GET_STATUS))
			{
				Log.d("ScannerModule", "if CALLBACK_GET_STATUS ");
				// int status = intent.getIntExtra(Constants.EXTRA_INT_DATA2, 0);
				// mCurrentStatus = STATUS_ARR[status];
				// setResultText("Current Status : "+mCurrentStatus+" / id : "+status);
				// refreshCurrentStatus();
			}
		}
	};

	public void refreshButton()
	{
		if(mOpenButton == null) return; 
		if(mCurrentStatus.equals(STATUS_CLOSE))
		{
			mOpenButton.setText("Open");
		}
		else mOpenButton.setText("Close");
	}


	public void setResultText(String text)
	{
		Log.d("MyNativeModule", "1scan from reader: " + text);
		mResultText.setText(text);
        Log.d("MyNativeModule", "2scan from reader: " + text);
	}

	public void refreshCurrentStatus()
	{		
		mStatusText.equals("Status : "+mCurrentStatus);
	}

	public void setSuccessFailText(String text)
	{
		mSuccessFailText.setText(text);
	}

}
