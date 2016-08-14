package com.programmer;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.v7.app.AlertDialog;

import com.facebook.react.ReactActivity;
import com.github.yamill.orientation.OrientationPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "programmer";
    }
    AlertDialog dialog;
    @Override
    public void onCreate(Bundle savedInstanceState, PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);
//        dialog=new AlertDialog.Builder(this).setView(R.layout.view_login_dailog).setNegativeButton("确定",null).create();
//        dialog.show();
    }
}
