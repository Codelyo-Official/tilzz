import React, { useEffect, useState } from "react";
import { ApiError } from "../../types/apiError";
import axios from "axios";
import Dots from "../../common/components/dots";
import Spinner from 'react-bootstrap/Spinner';
import { set } from "react-hook-form";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

type Invitation = {
    id: number;
    sender: string;
    message: string;
};

const initialInvitations: Invitation[] = [
    { id: 1, sender: 'Alice', message: 'invited you to join Project A' },
    { id: 2, sender: 'Bob', message: 'wants to collaborate on Design B' },
    { id: 3, sender: 'Charlie', message: 'shared access to Folder C' },
];


function Invites() {

    const [invitations, setInvitations] = React.useState([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [loading1, setLoading1] = React.useState<boolean>(false);

    const getIvites = async () => {
        try {
            setLoading(true)
            const token = sessionStorage.getItem('token');
            const invites_response = await axios.get(`${API_BASE_URL}/api/stories/story-invites/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(invites_response);
            setInvitations(invites_response.data);
            setLoading(false)

        } catch (err: any) {
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
                alert(errorMessage);
            }
        } finally {
        }
    }

    const accept = async (invid: any) => {
        setLoading1(true);
        try {
            const token = sessionStorage.getItem('token');
            const invite_accept_response = await axios.post(`${API_BASE_URL}/api/stories/story-invites/${invid}/accept/`, {}, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(invite_accept_response);
            setInvitations(invitations.filter((inv: any) => inv.id !== invid))
            setLoading1(false);

        } catch (err: any) {
            setLoading1(false);
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
                alert(errorMessage);
            }
        } finally {
        }

    }

    const reject = async (invid: any) => {

        try {
            setLoading1(true);

            const token = sessionStorage.getItem('token');
            const invite_reject_response = await axios.post(`${API_BASE_URL}/api/stories/story-invites/${invid}/reject/`, {}, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(invite_reject_response);
            setInvitations(invitations.filter((inv: any) => inv.id !== invid))
            setLoading1(false);


        } catch (err: any) {
            setLoading1(false);

            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
                alert(errorMessage);
            }
        } finally {
        }

    }

    React.useEffect(() => {
        getIvites();
    }, [])

    return (
        <>
            {loading ? (
                <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Dots />
                </div>) : (<>
                    <div className='story-preview' style={{ minHeight: "80vh", height: "auto" }}>
                        <div className="invitation-container" style={{ padding: '1rem' }}>
                            {invitations.length === 0 ? (
                                <div style={{ height: "80vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <p style={{ textAlign: "center" }}>No pending invitations.</p>
                                </div>
                            ) : (
                                invitations.map((inv: any) => (
                                    <div
                                        key={inv.id}
                                        className="invitation-card"
                                        style={{
                                            position: "relative",
                                            backgroundColor: 'transparent',
                                            boxShadow: 'none',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '1rem',
                                            marginBottom: '1rem',
                                            marginTop: '1rem',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div style={{ width: "190px" }}>
                                            {/* <img src={inv.story_data.cover_image} alt="Story Preview" style={{width:"120px", height:"70px",borderRadius:"4px",display:"inline",marginRight:"10px"}}/> */}
                                            <strong>{inv.invited_by_username}</strong> has invited you to collaborate on story {inv.story_data.title}
                                        </div>
                                        <div>
                                            {loading1 ? (
                                                <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <Spinner animation="grow" role="status" style={{ color: "blue", fontSize: "20px", background: "#ACA6FF" }}>
                                                        <span className="visually-hidden">Loading...</span>
                                                    </Spinner>
                                                </div>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            accept(inv.id)
                                                        }}
                                                        style={{
                                                            marginRight: '0.5rem',
                                                            padding: '0.5rem 1rem',
                                                            color: '#4F46E5',
                                                            border: '1px solid #4F46E5',
                                                            borderRadius: '24px',
                                                            cursor: 'pointer',
                                                            margin: "5px",
                                                            fontSize: "13px"
                                                        }}
                                                    >
                                                        accept
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            reject(inv.id)
                                                        }}
                                                        style={{
                                                            padding: '0.5rem 1rem',
                                                            color: '#e54e46',
                                                            border: '1px solid #e54e46',
                                                            borderRadius: '24px',
                                                            cursor: 'pointer',
                                                            margin: "5px",
                                                            fontSize: "13px"

                                                        }}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>)}
        </>

    );
}

export default Invites;
