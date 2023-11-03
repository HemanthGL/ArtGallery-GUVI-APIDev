export interface ICardDet{
    id: number,
    image_id: string,
    title: string,
    alt_image_ids: Array<string>,
    description?: string,
    artist_display: string,
    place_of_origin: string,
    thumbnail: { alt_text: string },
    Dimensions?: string,
    medium_display?:string,
    department_title?: string,
    publication_history?: string,
    exhibition_history?: string,
    credit_line?: string

}