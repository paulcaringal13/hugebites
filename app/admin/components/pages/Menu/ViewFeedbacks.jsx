"use client";
import "../../../../styles/globals.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import * as React from "react";
import lodash from "lodash";

// NOT COMPLETED
const ViewFeedbacks = ({
  viewFeedbacksOpen,
  setViewFeedbacksOpen,
  selectedRow,
  closeViewFeedbacks,
}) => {
  const [averageRating, setAverageRating] = useState(0);
  const [feedback, setFeedback] = useState([]);

  const [pageSize, setPageSize] = useState(3);

  const pagesCount = Math.ceil(feedback.length / pageSize);

  const pages = lodash.range(1, pagesCount + 1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginate = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return lodash(feedback).slice(startIndex).take(pageSize).value();
  };

  const paginatedList = paginate();

  const getCustomerFeedback = async () => {
    const feedbackRes = await fetch(
      `http://localhost:3000/api/feedback?` +
        new URLSearchParams({ prodId: selectedRow.productId }),
      {
        cache: "no-store",
      }
    );

    const feedback = await feedbackRes.json();

    const oneStarRating = feedback.filter((i) => i.rating == 1);

    const twoStarRating = feedback.filter((i) => i.rating == 2);

    const threeStarRating = feedback.filter((i) => i.rating == 3);

    const fourStarRating = feedback.filter((i) => i.rating == 4);

    const fiveStarRating = feedback.filter((i) => i.rating == 5);

    const averageRating =
      oneStarRating.length * 1 +
      twoStarRating.length * 2 +
      threeStarRating.length * 3 +
      fourStarRating.length * 4 +
      fiveStarRating.length * 5;

    setAverageRating(averageRating / feedback.length);
    setFeedback(feedback);
  };

  useEffect(() => {
    getCustomerFeedback();
  }, [selectedRow]);

  return (
    <>
      {/* View Feedback */}
      <Dialog open={viewFeedbacksOpen} onOpenChange={setViewFeedbacksOpen}>
        <DialogContent className="max-w-full max-h-full md:w-[90%] md:h-[85%] p-10 flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-3xl font-semibold leading-none tracking-tight">
                {selectedRow.productName} ({selectedRow.categoryName}) Comments
                and Feedbacks
              </Label>
              <Button
                className="bg-t{ransparent text-gray-400"
                onClick={() => {
                  closeViewFeedbacks();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="h-auto w-auto mt-6">
            <div className="flex items-center">
              <Label className="font-extrabold text-lg mr-5">
                Product Rating
              </Label>
              <svg
                className={`w-4 h-4 ${
                  averageRating >= 1 ? "text-primary" : "text-gray-300"
                } me-1`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className={`w-4 h-4 ${
                  averageRating >= 2 ? "text-primary" : "text-gray-300"
                } me-1`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className={`w-4 h-4 ${
                  averageRating >= 3 ? "text-primary" : "text-gray-300"
                } me-1`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className={`w-4 h-4 ${
                  averageRating >= 4 ? "text-primary" : "text-gray-300"
                } me-1`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className={`w-4 h-4 ${
                  averageRating >= 5 ? "text-primary" : "text-gray-300"
                } me-1`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                {!averageRating ? "0" : averageRating.toFixed(2)}
              </p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <a className="text-sm font-medium my-auto text-gray-900 underline hover:no-underline dark:text-white">
                {feedback.length} reviews
              </a>
            </div>
            <Separator className="my-2 col-span-2" />
            {feedback.length == 0 ? (
              <div className="h-[300px] w-full flex">
                <Label className="my-auto mx-auto text-xl font-extrabold">
                  No reviews
                </Label>
              </div>
            ) : (
              <>
                {paginatedList.map((i) => {
                  return (
                    <div className="flex flex-col" key={i.feedbackId}>
                      <div className="flex items-center mb-4">
                        {!i.avatar ? (
                          <img
                            className="w-10 h-10 me-4 rounded-full"
                            src={`/avatar/default-avatar.jpg`}
                            alt=""
                          />
                        ) : (
                          <img
                            className="w-10 h-10 me-4 rounded-full"
                            src={i.avatar}
                            alt=""
                          />
                        )}

                        <div className="font-medium dark:text-white">
                          <p>{i.customerFullName}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                        <svg
                          className={`w-4 h-4 ${
                            i.rating >= 1 ? "text-primary" : "text-gray-300"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={`w-4 h-4 ${
                            i.rating >= 2 ? "text-primary" : "text-gray-300"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={`w-4 h-4 ${
                            i.rating >= 3 ? "text-primary" : "text-gray-300"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={`w-4 h-4 ${
                            i.rating >= 4 ? "text-primary" : "text-gray-300"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={`w-4 h-4 ${
                            i.rating >= 5 ? "text-primary" : "text-gray-300"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </div>
                      <p className="my-2 text-gray-500 dark:text-gray-400">
                        {i.comment}
                      </p>
                      {!i.commentImage ? null : (
                        <div className="flex ml-5 m-0 w-32 h-36 max-h-36 my-2">
                          <img src={i.commentImage} alt="bg" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}

            <div className="w-fit mx-auto flex my-4">
              {pagesCount === 1 ? null : (
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm h-14 w-9"
                  aria-label="Pagination"
                >
                  {pages.map((page) => (
                    <a
                      href="#"
                      aria-current="page"
                      className={`relative z-10 inline-flex items-center hover:text-text-decoration-none  border-zinc-200 border-[1px] px-4 py-2 text-sm font-semibold  ${
                        currentPage === page
                          ? "bg-ring text-white "
                          : "bg-transparent text-black"
                      }`}
                      key={page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewFeedbacks;
