"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Leaf,
  MapPin,
  Heart,
  CreditCard,
  Calendar,
  Ticket,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/services/users";

const UserProfile = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token") || "";
    setToken(storedToken);
  }, []);
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, [token]);

  async function getUser() {
    const data = await getCurrentUser(token);
    if (data?.success) {
      setUser(data.user);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <div className="container mx-auto py-8 px-4">
        {/* User Info Header */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border border-green-200">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 rounded-full p-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1 text-green-800">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-green-600 flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                Member since 2025
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="bg-green-100 p-1 rounded-xl">
            {/* {["profile", "favorites", "billing", "history"].map((tab) => ( */}
            {["profile"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg px-6 py-2 capitalize"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Profile Information */}
          <TabsContent value="profile">
            <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-green-800">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: User, label: "Username", value: user?.username },
                    {
                      icon: Mail,
                      label: "Role",
                      value: user?.is_admin ? "Admin" : "User",
                    },
                    { icon: Phone, label: "Phone", value: user?.phone },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-green-50 p-4 rounded-xl hover:bg-green-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-green-500 rounded-full p-2">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-green-600">{item.label}</p>
                          <p className="font-medium text-green-900">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites */}
          {/* <TabsContent value="favorites">
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  Favorite Events
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user?.favoriteEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-green-100"
                    >
                      <img
                        src={event.imageUrl}
                        alt={event.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-green-800 text-xl mb-2">
                          {event.name}
                        </h3>
                        <div className="space-y-2 text-green-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {event.venue}
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-2xl font-bold text-green-700">
                            {event.price}
                          </span>
                          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                            <Ticket className="w-4 h-4" />
                            Buy Ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

          {/* Billing Information */}
          {/* <TabsContent value="billing">
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-green-800">
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-6">
                <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-8 h-8" />
                    <div>
                      <p className="text-lg font-bold">
                        {user?.billingInfo.cardNumber}
                      </p>
                      <p className="text-green-100">
                        Expires: {user?.billingInfo.expiryDate}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-green-300 pt-4">
                    <p className="text-green-100">Billing Address:</p>
                    <p className="font-medium">
                      {user?.billingInfo.billingAddress}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

          {/* Purchase History */}
          {/* <TabsContent value="history">
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-green-800">
                  Recent Purchases
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-6">
                <div className="space-y-4">
                  {user?.purchaseHistory.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="bg-white p-4 rounded-xl border border-green-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-green-800">
                            {purchase.eventName}
                          </p>
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {purchase.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-700">
                            {purchase.amount}
                          </p>
                          <p className="text-sm text-green-500">
                            {purchase.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
