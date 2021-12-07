package com.zevrant.services.zevranthomeui.pojo;

public class CodeExchangeRequest implements TokenRequest {

    private final String clientId = "android";
    private final String grantType = "authorization_code";
    private String code;
    private String redirectUri;

    public CodeExchangeRequest() {
    }

    public CodeExchangeRequest(String code, String redirectUri) {
        this.code = code;
        this.redirectUri = redirectUri;
    }

    public String getClientId() {
        return clientId;
    }

    public String getGrantType() {
        return grantType;
    }

    public String getCode() {
        return code;
    }

    public String getRedirectUri() {
        return redirectUri;
    }
}
