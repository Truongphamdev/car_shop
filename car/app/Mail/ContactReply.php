<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactReply extends Mailable
{
    use Queueable, SerializesModels;

    public $messageContent;
    public $userEmail;
    public $userName;

    public function __construct($messageContent, $userEmail, $userName = null)
    {
        $this->messageContent = $messageContent;
        $this->userEmail = $userEmail;
        $this->userName = $userName;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Cảm ơn bạn đã liên hệ với chúng tôi!',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact_reply',
            with: [
                'messageContent' => $this->messageContent,
                'userEmail' => $this->userEmail,
                'userName' => $this->userName,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}