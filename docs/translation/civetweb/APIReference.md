# CivetWeb API リファレンス

CivetWebは、大規模なアプリケーションの内部でHTTPおよびHTTPSのライブラリとして使用されることがよくあります。CivetWebの機能をより大規模なコードベースに統合するために、C APIが提供されています。このドキュメントでは、公開されているC言語のAPIについて説明します。API の基本的な使用例は [Embedding.md](Embedding.md) や examples ディレクトリで見ることができます。

また、いくつかの基本的な機能に対するC++のラッパーも用意されています。このC++ラッパーを使用してアクセスできるのは、C APIで利用可能な機能のごく一部だけであることに注意してください。C++ ラッパーはユニットテストされておらず、この C API ドキュメントに相当する C++ API ドキュメントは存在しません。


## マクロ

| Macro | Description |
| :--- | :--- |
| **`CIVETWEB_VERSION`** | ソフトウェアの現在のバージョンを、メジャーバージョンとマイナーバージョンをドットで区切った文字列で指定します。バージョン1.9の場合、この文字列は「1.9」、このバージョンの最初のパッチの場合は「1.9.1」という値になります。 |
| **`CIVETWEB_VERSION_MAJOR`** | 現在のメジャーバージョンを番号で表し、例えばバージョン1.9の場合は(1)となる。 |
| **`CIVETWEB_VERSION_MINOR`** | 現在のマイナーバージョンを番号で表し、例えばバージョン1.9の場合は(9)となる。 |
| **`CIVETWEB_VERSION_PATCH`** | 現在のパッチのバージョン。例えば、バージョン 1.9 の場合は (0)、バージョン 1.9.1 の場合は (1) となる。 |

## ハンドル

* `struct mg_context *` HTTP(S) サーバの 1 つのインスタンスに対するハンドルです。引数として `const struct mg_context *` を使用するすべての関数は、実行中のサーバーインスタンスを変更せず、単に問い合わせ情報を取得するだけです。コンストラクタでない mg_context *` を引数にとる関数は、サーバーのインスタンスを変更することがある (例えば、新しい URI を登録する、サーバーを停止する、...など)。

* `struct mg_connection *` 個々のクライアント・サーバ接続のためのハンドル。`const struct mg_connection *` で動作する関数は、クライアントからデータを読み込んだり、クライアントにデータを送信することなく、サーバーが既に知っているデータに対して操作を行います。const struct mg_connection *` の引数を使用するコールバックは、 `mg_read()` および `mg_write()` ファミリーの関数を呼び出さないことが想定されています。正しいアプリケーションをサポートするために、読み込みと書き込みの関数には、非構造体の `struct mg_connection *` 接続ハンドルが必要です。

両構造体の内容は、インターフェースでは定義されておらず、不透明なポインタ（ハンドル）としてのみ使用されます。

## Structures

* [`struct mg_callbacks;`](api/mg_callbacks.md)
* [`struct mg_client_cert;`](api/mg_client_cert.md)
* [`struct mg_client_options;`](api/mg_client_options.md)
* [`struct mg_error_data;`](api/mg_error_data.md)
* [`struct mg_form_data_handler;`](api/mg_form_data_handler.md)
* [`struct mg_header;`](api/mg_header.md)
* [`struct mg_init_data;`](api/mg_init_data.md)
* [`struct mg_option;`](api/mg_option.md)
* [`struct mg_request_info;`](api/mg_request_info.md)
* [`struct mg_response_info;`](api/mg_response_info.md)
* [`struct mg_server_port;`](api/mg_server_port.md)
* [`struct mg_websocket_subprotocols;`](api/mg_websocket_subprotocols.md)

## Library API Functions

* [`mg_init_library( feature );`](api/mg_init_library.md)
* [`mg_exit_library( feature );`](api/mg_exit_library.md)

* [`mg_check_feature( feature );`](api/mg_check_feature.md)
* [`mg_version();`](api/mg_version.md)


## Server API Functions

* [`mg_start( callbacks, user_data, options );`](api/mg_start.md)
* [`mg_start2( init, error );`](api/mg_start2.md)
* [`mg_start_domain( ctx, configuration_options );`](api/mg_start_domain.md)
* [`mg_start_domain2( ctx, configuration_options, error );`](api/mg_start_domain2.md)
* [`mg_stop( ctx );`](api/mg_stop.md)

* [`mg_get_builtin_mime_type( file_name );`](api/mg_get_builtin_mime_type.md)
* [`mg_get_option( ctx, name );`](api/mg_get_option.md)
* [`mg_get_server_ports( ctx, size, ports );`](api/mg_get_server_ports.md)
* [`mg_get_user_data( ctx );`](api/mg_get_user_data.md)
* [`mg_set_auth_handler( ctx, uri, handler, cbdata );`](api/mg_set_auth_handler.md)
* [`mg_set_request_handler( ctx, uri, handler, cbdata );`](api/mg_set_request_handler.md)
* [`mg_set_websocket_handler( ctx, uri, connect_handler, ready_handler, data_handler, close_handler, cbdata );`](api/mg_set_websocket_handler.md)
* [`mg_set_websocket_handler_with_subprotocols( ctx, uri, subprotocols, connect_handler, ready_handler, data_handler, close_handler, cbdata );`](api/mg_set_websocket_handler_with_subprotocols.md)

* [`mg_lock_context( ctx );`](api/mg_lock_context.md)
* [`mg_unlock_context( ctx );`](api/mg_unlock_context.md)

* [`mg_get_context( conn );`](api/mg_get_context.md)

* [`mg_send_http_error( conn, status_code, fmt, ... );`](api/mg_send_http_error.md)
* [`mg_send_http_ok( conn, mime_type, content_length );`](api/mg_send_http_ok.md)
* [`mg_send_http_redirect( conn, target_url, redirect_code );`](api/mg_send_http_redirect.md)

* [`mg_send_digest_access_authentication_request( conn, realm );`](api/mg_send_digest_access_authentication_request.md)
* [`mg_check_digest_access_authentication( conn, realm, filename );`](api/mg_check_digest_access_authentication.md)
* [`mg_modify_passwords_file( passwords_file_name, realm, user, password );`](api/mg_modify_passwords_file.md)
* [`mg_modify_passwords_file_ha1( passwords_file_name, realm, user, ha1 );`](api/mg_modify_passwords_file_ha1.md)

* [`mg_get_request_info( conn );`](api/mg_get_request_info.md)
* [`mg_get_request_link( conn, buf, buflen );`](api/mg_get_request_link.md)
* [`mg_handle_form_request( conn, fdh );`](api/mg_handle_form_request.md)

* [`mg_send_file( conn, path );`](api/mg_send_file.md)
* [`mg_send_mime_file( conn, path, mime_type );`](api/mg_send_mime_file.md)
* [`mg_send_mime_file2( conn, path, mime_type, additional_headers );`](api/mg_send_mime_file2.md)
* [`mg_websocket_write( conn, opcode, data, data_len );`](api/mg_websocket_write.md)

* [`mg_response_header_*();`](api/mg_response_header_X.md)

## Client API Functions

* [`mg_connect_client( host, port, use_ssl, error_buffer, error_buffer_size );`](api/mg_connect_client.md)
* [`mg_connect_client_secure( client_options, error_buffer, error_buffer_size );`](api/mg_connect_client_secure.md)
* [`mg_connect_websocket_client( host, port, use_ssl, error_buffer, error_buffer_size, path, origin, data_func, close_func, user_data);`](api/mg_connect_websocket_client.md)
* [`mg_websocket_client_write( conn, opcode, data, data_len );`](api/mg_websocket_client_write.md)

* [`mg_download( host, port, use_ssl, error_buffer, error_buffer_size, fmt, ... );`](api/mg_download.md)

* [`mg_get_response( conn, ebuf, ebuf_len, timeout );`](api/mg_get_response.md)
* [`mg_get_response_info( conn );`](api/mg_get_response_info.md)

* [`mg_connect_client2( host, protocol, port, path, init, error );`](api/mg_connect_client2.md)
* [`mg_get_response2( conn, error, timeout );`](api/mg_get_response2.md)


## Common API Functions

* [`mg_close_connection( conn );`](api/mg_close_connection.md)
* [`mg_cry( conn, fmt, ... );`](api/mg_cry.md)

* [`mg_get_cookie( cookie, var_name, buf, buf_len );`](api/mg_get_cookie.md)
* [`mg_get_header( conn, name );`](api/mg_get_header.md)
* [`mg_get_response_code_text( conn, response_code );`](api/mg_get_response_code_text.md)
* [`mg_get_user_connection_data( conn );`](api/mg_get_user_connection_data.md)
* [`mg_get_valid_options();`](api/mg_get_valid_options.md)
* [`mg_get_var( data, data_len, var_name, dst, dst_len );`](api/mg_get_var.md)
* [`mg_get_var2( data, data_len, var_name, dst, dst_len, occurrence );`](api/mg_get_var2.md)
* [`mg_lock_connection( conn );`](api/mg_lock_connection.md)
* [`mg_md5( buf, ... );`](api/mg_md5.md)
* [`mg_printf( conn, fmt, ... );`](api/mg_printf.md)
* [`mg_read( conn, buf, len );`](api/mg_read.md)
* [`mg_send_chunk( conn, buf, len );`](api/mg_send_chunk.md)
* [`mg_send_file_body( conn, path );`](api/mg_send_file_body.md)
* [`mg_set_user_connection_data( conn, data );`](api/mg_set_user_connection_data.md)
* [`mg_split_form_urlencoded( data, form_fields, num_form_fields);`](api/mg_split_form_urlencoded.md)
* [`mg_start_thread( f, p );`](api/mg_start_thread.md)
* [`mg_store_body( conn, path );`](api/mg_store_body.md)
* [`mg_strcasecmp( s1, s2 );`](api/mg_strcasecmp.md)
* [`mg_strncasecmp( s1, s2, len );`](api/mg_strncasecmp.md)
* [`mg_unlock_connection( conn );`](api/mg_unlock_connection.md)
* [`mg_url_decode( src, src_len, dst, dst_len, is_form_url_encoded );`](api/mg_url_decode.md)
* [`mg_url_encode( src, dst, dst_len );`](api/mg_url_encode.md)
* [`mg_write( conn, buf, len );`](api/mg_write.md)

## Diagnosis Functions

* [`mg_get_system_info( buffer, buf_len );`](api/mg_get_system_info.md)
* [`mg_get_context_info( ctx, buffer, buf_len );`](api/mg_get_context_info.md)
* [`mg_get_connection_info( ctx, idx, buffer, buf_len );`](api/mg_get_connection_info.md)


## Deprecated / removed:

* [~~`mg_get_valid_option_names();`~~](api/mg_get_valid_option_names.md)
* [~~`mg_upload( conn, destination_dir );`~~](api/mg_upload.md)
* [~~`mg_get_ports( ctx, size, ports, ssl);`~~](api/mg_get_ports.md)
