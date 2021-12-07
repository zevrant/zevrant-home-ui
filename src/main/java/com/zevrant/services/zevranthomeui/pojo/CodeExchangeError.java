package com.zevrant.services.zevranthomeui.pojo;

public class CodeExchangeError {

    private String errorMessage;
    private int statusCode;

    public CodeExchangeError() {
    }

    public CodeExchangeError(String errorMessage, int statusCode) {
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
}
