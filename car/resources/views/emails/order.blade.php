<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đơn hàng đã được xác nhận</title>
</head>
<body>
    <h2>Chào bạn,</h2>
    <p>Cảm ơn bạn đã đặt hàng tại {{ config('app.name') }}!</p>
    <p>Thông tin đơn hàng:</p>
    <ul>
        <li>Mã đơn hàng: {{ $order['id'] }}</li>
        <li>Tổng tiền: {{ number_format($order['total_price']) }}đ</li>
        <li>Phương thức thanh toán: {{ ucfirst($order['payment_method']) }}</li>
    </ul>
    <p>Chúng tôi sẽ giao hàng sớm nhất có thể.</p>
    <p>Trân trọng,</p>
    <p>{{ config('app.name') }}</p>
</body>
</html>
