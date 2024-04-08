
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
-- Consulta

SELECT rev.name AS reviewer_name,
       b.title AS book_title,
       r.rating,
       CASE 
           WHEN TRY_CONVERT(DATE, r.rating_date) IS NOT NULL THEN CONVERT(VARCHAR, TRY_CONVERT(DATE, r.rating_date), 103)
           ELSE 'NULL' 
       END AS rating_date
FROM ratings r
JOIN reviewers rev ON r.reviewer_id = rev.id_reviewer
JOIN books b ON r.book_id = b.id_book
ORDER BY rev.name, b.title, r.rating;

