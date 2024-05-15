import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BusinessHeader from './Header';
import BusinessFooter from './Footer';

const DAYS_OF_WEEK = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
const DEVICES = ["IPHONE", "IPAD", "MACBOOK"];
const REPAIRS = ["SCREEN_REPAIR", "CAMERA_REPAIR", "BATTERY_REPLACEMENT"];
const VEHICLES = ["TOYOTA", "BMW", "VOLKSWAGEN"];
const SERVICES = ["DETAILING", "GENERAL_WASH", "BRAKE_FLUID"];

function CreateAvailability() {
    const history = useHistory();
    const [uid, setUid] = useState('');
    const [startDatetime, setStartDatetime] = useState('');
    const [endDatetime, setEndDatetime] = useState('');
    const [daysSupported, setDaysSupported] = useState([]);
    const [services, setServices] = useState([{ type: 'device', device: '', device_repair: '', vehicle: '', vehicle_service: '', price: '' }]);
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUserIdSubmitted, setIsUserIdSubmitted] = useState(false);

    const handleCreate = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!uid.trim()) {
            setErrorMessage('User ID cannot be empty.');
            return;
        }

        const formatDateTime = (datetime) => {
            const [date, time] = datetime.split('T');
            return `${date} ${time}:00.000000`;
        };

        const data = {
            uid: parseInt(uid),
            start_datetime: formatDateTime(startDatetime),
            end_datetime: formatDateTime(endDatetime),
            start_time: startDatetime.split('T')[1] + ':00',
            end_time: endDatetime.split('T')[1] + ':00',
            days_supported: daysSupported,
            services_data: services,
            available: true,
            password: password
        };

        try {
            const response = await fetch('http://localhost:5000/availabilities/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                setSuccessMessage('Availability and services created successfully! Availability ID: ' + result.availability_id);

                setUid('');
                setStartDatetime('');
                setEndDatetime('');
                setDaysSupported([]);
                setServices([{ type: 'device', device: '', device_repair: '', vehicle: '', vehicle_service: '', price: '' }]);
                setPassword('');

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setErrorMessage('There was a problem creating the availability.');
            }
        } catch (error) {
            setErrorMessage('There was a problem creating the availability.');
        }
    };

    const handleCancel = () => {
        history.push('/business');
    };

    const handleDaysSupportedChange = (day) => {
        setDaysSupported(prevDays =>
            prevDays.includes(day)
                ? prevDays.filter(d => d !== day)
                : [...prevDays, day]
        );
    };

    const handleServiceChange = (index, field, value) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
    };

    const addService = () => {
        setServices([...services, { type: 'device', device: '', device_repair: '', vehicle: '', vehicle_service: '', price: '' }]);
    };

    const handleUserIdSubmit = (event) => {
        event.preventDefault();
        setIsUserIdSubmitted(true);
    };

    return (
        <div>
            <BusinessHeader />
            <div className="flex flex-col items-center p-12">
                <div className="w-full max-w-[800px] bg-white shadow-md rounded-lg">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-[#07074D] mb-4">Create Availability</h2>
                        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                        {!isUserIdSubmitted ? (
                            <form onSubmit={handleUserIdSubmit} className="mb-5">
                                <label htmlFor="userId" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Enter User ID:
                                </label>
                                <input
                                    id="userId"
                                    name="userId"
                                    type="text"
                                    value={uid}
                                    onChange={(e) => setUid(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                                <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Enter Password:
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="mt-4 w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:shadow-form"
                                >
                                    Submit
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleCreate} className="w-full">
                                <div className="mb-5">
                                    <label htmlFor="startDatetime" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Start DateTime:
                                    </label>
                                    <input
                                        id="startDatetime"
                                        name="start_datetime"
                                        type="datetime-local"
                                        value={startDatetime}
                                        onChange={(e) => setStartDatetime(e.target.value)}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        required
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="endDatetime" className="mb-3 block text-base font-medium text-[#07074D]">
                                        End DateTime:
                                    </label>
                                    <input
                                        id="endDatetime"
                                        name="end_datetime"
                                        type="datetime-local"
                                        value={endDatetime}
                                        onChange={(e) => setEndDatetime(e.target.value)}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        required
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="daysSupported" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Days Supported:
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {DAYS_OF_WEEK.map(day => (
                                            <label key={day} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={daysSupported.includes(day)}
                                                    onChange={() => handleDaysSupportedChange(day)}
                                                    className="mr-2"
                                                />
                                                {day}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                                        Services:
                                    </label>
                                    {services.map((service, index) => (
                                        <div key={index} className="mb-4">
                                            <label className="block text-base font-medium text-[#07074D]">Service Type:</label>
                                            <select
                                                value={service.type}
                                                onChange={(e) => handleServiceChange(index, 'type', e.target.value)}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mb-2"
                                            >
                                                <option value="device">Device</option>
                                                <option value="vehicle">Vehicle</option>
                                            </select>
                                            {service.type === 'device' ? (
                                                <>
                                                    <select
                                                        value={service.device}
                                                        onChange={(e) => handleServiceChange(index, 'device', e.target.value)}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mb-2"
                                                    >
                                                        <option value="">Select Device</option>
                                                        {DEVICES.map((device, i) => (
                                                            <option key={i} value={device}>{device}</option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        value={service.device_repair}
                                                        onChange={(e) => handleServiceChange(index, 'device_repair', e.target.value)}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                    >
                                                        <option value="">Select Repair</option>
                                                        {REPAIRS.map((repair, i) => (
                                                            <option key={i} value={repair}>{repair}</option>
                                                        ))}
                                                    </select>
                                                </>
                                            ) : (
                                                <>
                                                    <select
                                                        value={service.vehicle}
                                                        onChange={(e) => handleServiceChange(index, 'vehicle', e.target.value)}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mb-2"
                                                    >
                                                        <option value="">Select Vehicle</option>
                                                        {VEHICLES.map((vehicle, i) => (
                                                            <option key={i} value={vehicle}>{vehicle}</option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        value={service.vehicle_service}
                                                        onChange={(e) => handleServiceChange(index, 'vehicle_service', e.target.value)}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                    >
                                                        <option value="">Select Service</option>
                                                        {SERVICES.map((service, i) => (
                                                            <option key={i} value={service}>{service}</option>
                                                        ))}
                                                    </select>
                                                </>
                                            )}
                                            <input
                                                type="number"
                                                placeholder="Service Price"
                                                value={service.price}
                                                onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addService}
                                        className="w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:shadow-form mt-4"
                                    >
                                        Add Another Service
                                    </button>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="hover:shadow-form w-full rounded-md bg-gray-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <BusinessFooter />
        </div>
    );
}

export default CreateAvailability;
