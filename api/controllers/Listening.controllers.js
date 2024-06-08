
import Listening from "../Models/Listening.module.js";
import { ErrorHandler } from "../utils/Error.js";

export const createListening = async (req, res, next) => {
  try {
    const listening = await Listening.create(req.body);
    res.status(201).json(listening);
  } catch (error) {
    next(error);
  }
};

export const Deletelistening = async (req, res, next) => {
  const listenings = await Listening.findById(req.params.id);

  if (!listenings) {
    return next(ErrorHandler(401, "Listning not found"));
  }

  if (req.user.id !== listenings.userRef) {
    return next(ErrorHandler(401, "You can only delete your own listening"));
  }

  try {
    await Listening.findByIdAndDelete(req.params.id);
    res.status(201).json("Listening has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateListening = async (req, res, next) => {
  const listening = await Listening.findById(req.params.id);

  if (!listening) {
    return next(ErrorHandler(401, "Listening not found"));
  }

  if (req.user.id !== listening.userRef) {
    return next(ErrorHandler(401, "You can only update your own account"));
  }

  try {
    const updateLIstening = await Listening.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updateLIstening);
  } catch (error) {
    next(error);
  }
};

export const getListening = async (req, res, next) => {
  try {
    const listing = await Listening.findById(req.params.id);

    if (!listing) {
      return next(ErrorHandler(401, "Listening not found"));
    }

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listening.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
