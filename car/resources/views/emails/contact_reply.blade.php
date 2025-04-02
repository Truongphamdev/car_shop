<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }}</title>
</head>
<body>
    <h1>Xin chào {{ $userName ?? 'Khách hàng' }},</h1>
    <p>Cảm ơn bạn đã liên hệ qua email <strong>{{ $userEmail }}</strong>! Đây là tin nhắn bạn gửi:</p>
    <blockquote>{{ $messageContent }}</blockquote>
    <p>Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
    <p>Trân trọng,<br>Đội ngũ hỗ trợ</p>
    <a href="{{ url('/') }}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Truy cập website</a>
</body>
</html>