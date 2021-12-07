package com.zevrant.services.zevranthomeui.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class CodeExchangeException extends Throwable {

    public CodeExchangeException(String message) {
        super(message);
    }
}
