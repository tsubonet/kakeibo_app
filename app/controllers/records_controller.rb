class RecordsController < ApplicationController

  before_action :authenticate_user!

  # POST /records
  # POST /records.json
  def create
    record = Record.new(record_params)
    if record.save
      response_data = {
        record: record,
        txt: ['投稿しました！'],
      }
      render json: response_data, status: :created
    else
      response_data = {
        txt: record.errors.full_messages,
      }
      render json: response_data, status: :unprocessable_entity
    end
  end

  # PATCH /records/1
  # PATCH /records/1.json
  def update
    record = Record.find(params[:id])
    if record.update(record_params)
      response_data = {
        record: record,
        txt: ['更新しました！'],
      }
      render json: response_data, status: :ok
    else
      response_data = {
        txt: record.errors.full_messages,
      }
      render json: response_data, status: :unprocessable_entity
    end
  end

  # DELETE /records/1
  # DELETE /records/1.json
  def destroy
    record = Record.find(params[:id])
    if record.destroy
      response_data = {
        txt: ['削除しました！'],
      }
      render json: response_data, status: :ok
    else
      response_data = {
        txt: ['削除できませんでした！'],
      }
      render json: response_data, status: :unprocessable_entity
    end
  end

  private
    def record_params
      params.permit(:done_on, :sort, :price)
    end
end