<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h2>Xin chào {{ $order->user->name }},</h2>

<p>Trạng thái đơn hàng của bạn đã được cập nhật.</p>

<ul>
    <li><strong>Mã đơn hàng:</strong> {{ $order->id }}</li>
    <li><strong>Ngày đặt:</strong> {{ $order->created_at->format('d/m/Y') }}</li>
    <li><strong>Trạng thái cũ:</strong> {{ $oldStatus }}</li>
    <li><strong>Trạng thái mới:</strong> {{ $order->status }}</li>
    <li><strong>Tổng tiền:</strong> {{ number_format($order->total_price, 0, ',', '.') }} VNĐ</li>
</ul>

<p>Chúng tôi sẽ tiếp tục xử lý đơn hàng của bạn. Cảm ơn bạn đã mua sắm tại hệ thống của chúng tôi!</p>

<p>Trân trọng,<br>Đội ngũ quản trị</p>

</body>
</html>