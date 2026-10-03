import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { Contact } from "../models/Contact";
import { sendContactEmail } from "../services/email.service";

// POST /api/contact
export const submitContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
      return;
    }

    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      status: "unread",
    });

    try {
      await sendContactEmail({ name, email, subject, message });
    } catch (error) {
      console.error("[Contact] Email delivery failed:", error);
      res.status(503).json({
        success: false,
        message:
          "Your message was saved, but could not be emailed. Please try again later.",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Your message has been sent to pokharelbibhav58@gmail.com.",
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/contact (Protected Admin)
export const getContactMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/contact/:id/status (Protected Admin)
export const updateContactStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["unread", "read", "replied"].includes(status)) {
      res.status(400).json({ success: false, message: "Invalid status value" });
      return;
    }

    const message = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!message) {
      res.status(404).json({ success: false, message: "Message not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Message status updated",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/contact/:id (Protected Admin)
export const deleteContactMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndDelete(id);

    if (!message) {
      res.status(404).json({ success: false, message: "Message not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
