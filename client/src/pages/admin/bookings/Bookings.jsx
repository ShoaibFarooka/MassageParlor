import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";
import bookingService from "../../../services/bookingService";
import DeleteConfirmationModal from "../../../components/Delete/DeleteConfirmationModal";
import CustomModal from "../../../components/CustomModal/CustomModal";
import BookingInfo from "./components/BookingInfo";
import BookingsTable from "./components/BookingsTable";
import ServicesHeader from "../components/ServicesHeader";

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const dispatch = useDispatch();

    const fetchBookings = async () => {
        try {
            dispatch(ShowLoading());
            const response = await bookingService.getBookings();
            setBookings(response);
        } catch (error) {
            toast.error("Failed to fetch bookings");
            console.error(error);
        } finally {
            dispatch(HideLoading());
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleView = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (booking) => {
        setSelectedBooking(booking);
        setDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedBooking) return;
        try {
            dispatch(ShowLoading());
            await bookingService.deleteBooking(selectedBooking._id);
            toast.success("Booking deleted successfully");
            fetchBookings();
        } catch (error) {
            toast.error("Failed to delete booking");
            console.error(error);
        } finally {
            dispatch(HideLoading());
            setDeleteOpen(false);
            setSelectedBooking(null);
        }
    };

    const handleApprove = async () => {
        try {
            dispatch(ShowLoading());
            await bookingService.updateBooking(selectedBooking._id, { status: "Approved" });
            toast.success("Booking approved");
            fetchBookings();
        } catch (error) {
            toast.error("Failed to approve booking");
            console.error(error);
        } finally {
            dispatch(HideLoading());
            setIsModalOpen(false);
        }
    };

    const handleReject = async () => {
        try {
            dispatch(ShowLoading());
            await bookingService.updateBooking(selectedBooking._id, { status: "Rejected" });
            toast.success("Booking rejected");
            fetchBookings();
        } catch (error) {
            toast.error("Failed to reject booking");
            console.error(error);
        } finally {
            dispatch(HideLoading());
            setIsModalOpen(false);
        }
    };


    return (
        <div>

            <div className="mb-[30px]">
                <ServicesHeader title={'Bookings'} />
            </div>

            <BookingsTable
                bookings={bookings}
                onView={handleView}
                onDelete={handleDeleteClick}
            />

            <DeleteConfirmationModal
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
            />

            <CustomModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Booking Details"
            >
                <BookingInfo
                    booking={selectedBooking}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            </CustomModal>
        </div>
    );
}

export default Bookings;
